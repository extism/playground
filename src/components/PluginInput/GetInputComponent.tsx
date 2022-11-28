import React from 'react';
import arrayTob64 from '../../lib/arrayToB64';

type InputComponentProps = {
  bytes: Uint8Array;
  dispatch?: any;
  inputChangeHandler?: any;
};

function _base64ToArrayBuffer(base64: string) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

const GetInputComponent = (inputType: string): React.FC<InputComponentProps> => {
  switch (inputType) {
    case 'application/json':
      return JSONInput;
    case 'text/markdown':
      return MarkdownInput;
    case 'text/html':
      return HTMLInput;
    case 'image/png':
    case 'image/jpg':
    case 'image/jpeg':
      return ImageInput(inputType);
    case 'text/plain':
    default:
      return PlainText;
  }
};

const PlainText: React.FC<InputComponentProps> = ({ bytes, dispatch }) => {
  const text = new TextDecoder().decode(bytes);

  const inputChangeHandler = (e: any) => {
    const toEncoded = new TextEncoder().encode(e.target.value);
    dispatch({ type: 'INPUT_CHANGE', payload: { input: toEncoded } });
  };

  return (
    <textarea
      className="input-text-component p-2 "
      id="plugin-input-textarea"
      name="input"
      placeholder="enter text or drag file here..."
      onChange={inputChangeHandler}
      value={text}
    ></textarea>
  );
};

const HTMLInput: React.FC<InputComponentProps> = ({ bytes, dispatch }) => {
  const text = new TextDecoder().decode(bytes);
  const inputChangeHandler = (e: any) => {
    const toEncoded = new TextEncoder().encode(e.target.value);
    dispatch({ type: 'INPUT_CHANGE', payload: { input: toEncoded } });
  };

  return (
    <textarea
      contentEditable
      suppressContentEditableWarning
      id="plugin-output-area"
      placeholder="enter text or drag file here..."
      className="input-text-component p-2"
      value={text}
      onChange={inputChangeHandler}
    />
  );
};

const MarkdownInput: React.FC<InputComponentProps> = ({ bytes, dispatch }) => {
  const text = new TextDecoder().decode(bytes);
  const inputChangeHandler = (e: any) => {
    const toEncoded = new TextEncoder().encode(e.target.value);
    dispatch({ type: 'INPUT_CHANGE', payload: { input: toEncoded } });
  };

  return (
    <textarea
      contentEditable
      suppressContentEditableWarning
      placeholder="enter text or drag file here..."
      id="plugin-output-area"
      className="input-text-component p-2"
      value={text}
      onChange={inputChangeHandler}
    />
  );
};
const JSONInput: React.FC<InputComponentProps> = ({ bytes, dispatch }): any => {
  const text = new TextDecoder().decode(bytes);

  const inputChangeHandler = (e: any) => {
    const toEncoded = new TextEncoder().encode(e.target.value);
    dispatch({ type: 'INPUT_CHANGE', payload: { input: toEncoded } });
  };

  let data = JSON.parse(JSON.stringify(text, null, 4));

  return (
    <textarea
      className="input-text-component font-mono  p-2 "
      id="plugin-input-textarea"
      placeholder="enter text or drag file here..."
      rows={15}
      name="input"
      onChange={inputChangeHandler}
      value={data}
    />
  );
};

const ImageInput = (mimeType: string): React.FC<InputComponentProps> => {
  return function ImageOutputComponent({ bytes, dispatch }) {
    const data = arrayTob64(bytes);

    const onDrop = async (e: any) => {
      e.preventDefault();

      const fileList = e.dataTransfer.files;
      let file = fileList[0];

      if ([...e.dataTransfer.types].includes('text/uri-list')) {
        let droppedImageSrc = e.dataTransfer.getData('text/uri-list');
        let sliceIndex = droppedImageSrc.indexOf('64,') + 3;
        let b64 = e.dataTransfer.getData('text/uri-list').slice(sliceIndex);
        let toB64Buffer = _base64ToArrayBuffer(b64);
        let input = new Uint8Array(toB64Buffer);

        dispatch({ type: 'INPUT_CHANGE', payload: { input } });

        return;
      } else {
        try {
          file.arrayBuffer().then((b: ArrayBuffer) => {
            let input = new Uint8Array(b);
            dispatch({ type: 'INPUT_CHANGE', payload: { input } });
          });
        } catch (error) {
          console.log('ERROr in input for real', error);
        }
      }
    };

    const onDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('text/uri-list', data);
      e.dataTransfer.dropEffect = 'copy';
      e.dataTransfer.effectAllowed = 'copyMove';
    };
    const onDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    return (
      <div onDragOver={onDragOver} onDrop={onDrop} className="input-image-component-wrapper">
        <img
          onDragStart={onDragStart}
          className="object-contain rounded max-h-full w-full md:h-[100%]"
          id="plugin-input-textarea"
          src={`data:${mimeType};base64,${data}`}
          alt=""
        />
      </div>
    );
  };
};

export default GetInputComponent;
