import React from 'react';
import arrayTob64 from '../../util/arrayToB64';
type OutputComponentProps = {
  bytes: Uint8Array;
};

const GetOutputComponent = (outputType: string): React.FC<OutputComponentProps> => {
  switch (outputType) {
    case 'application/json':
      return JSONOutput;
    case 'text/html':
      return HTMLOutput;
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
      return ImageOutput(outputType);
    case 'text/plain':
    default:
      return PlainText;
  }
};

const PlainText: React.FC<OutputComponentProps> = ({ bytes }) => {
  const text = new TextDecoder().decode(bytes);

  return (
    <textarea
      className="font-serif rounded p-2 h-128 basis-full border-none"
      id="plugin-output-area"
      rows={15}
      name="output"
      disabled
      value={text}
    >
      {text}
    </textarea>
  );
};

// Create an Image component from a mime type
const ImageOutput = (mimeType: string): React.FC<OutputComponentProps> => {
  return function ImageOutputComponent({ bytes }) {
    const data = arrayTob64(bytes);

    return (
      <div className="rounded h-128 border-none basis-full">
        <img
          className="object-contain h-128 w-full"
          id="plugin-output-area"
          src={`data:${mimeType};base64,${data}`}
          alt=""
        />
      </div>
    );
  };
};

const JSONOutput: React.FC<OutputComponentProps> = ({ bytes }) => {
  const text = new TextDecoder().decode(bytes);

  let data = JSON.parse(JSON.stringify(text, null, 4));
  // console.log(data, 'data');

  return (
    <div className="rounded h-128 border-none basis-full flex">
      <pre className="font-mono overflow-scroll break-all  whitespace-pre-wrap ">{data}</pre>
    </div>
  );
};

const HTMLOutput: React.FC<OutputComponentProps> = ({ bytes }) => {
  const text = new TextDecoder().decode(bytes);

  return <div id="plugin-output-area" className="rounded h-128 border-none basis-full"></div>;
};

export default GetOutputComponent;
