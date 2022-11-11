import React from 'react';

const GetOutputComponent = (outputType: string, output: Uint8Array) => {
  var OutputComp: React.FunctionComponent<{ bytes: Uint8Array }>;
  switch (outputType) {
    case 'text/plain':
      OutputComp = PlainText;
      break;
    case 'image/png':
      OutputComp = ImagePng;
      break;
    case 'image/jpg':
      OutputComp = ImageJpg;
      break;
    case 'image/jpeg':
      OutputComp = ImageJpeg;
      break;
    case 'application/json':
      OutputComp = JSONOutput;
      break;
    case 'text/html':
      OutputComp = HTMLOutput;
      break;
  }
  // @ts-ignore
  return <OutputComp bytes={output} />;
};

const PlainText = ({ bytes }: { bytes: Uint8Array }) => {
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

const ImagePng = ({ bytes }: { bytes: Uint8Array }) => {
  const data = arrayTob64(bytes);

  return (
    <div className=" rounded h-128 border-none basis-full">
      <img
        className="object-contain h-128 w-full "
        id="plugin-output-area"
        src={`data:image/png;base64,${data}`}
        alt=""
      />
    </div>
  );
};
const ImageJpg = ({ bytes }: { bytes: Uint8Array }) => {
  const data = arrayTob64(bytes);
  return (
    <div className="rounded h-128 border-none basis-full">
      <img
        className="object-contain h-128 w-full"
        id="plugin-output-area"
        src={`data:image/jpg;base64,${data}`}
        alt=""
      />
    </div>
  );
};
const ImageJpeg = ({ bytes }: { bytes: Uint8Array }) => {
  const data = arrayTob64(bytes);
  console.log('thishappens', data);

  return (
    <div className="rounded h-128 border-none basis-full">
      <img
        className="object-contain h-128 w-full"
        id="plugin-output-area"
        src={`data:image/jpeg;base64,${data}`}
        alt=""
      />
    </div>
  );
};

const JSONOutput = ({ bytes }: { bytes: Uint8Array }) => {
  const text = new TextDecoder().decode(bytes);
  // const toJson = JSON.stringify(JSON.parse(text), null, 4);
  // get params mapped to input. component.
  //
  return (
    <div className="rounded h-128 border-none basis-full">
      {text}
      {/* <pre id="plugin-output-area"></pre> */}
    </div>
  );
};
const HTMLOutput = ({ bytes }: { bytes: Uint8Array }) => {
  const text = new TextDecoder().decode(bytes);
  // const toJson = JSON.stringify(JSON.parse(text), null, 2);

  return (
    <div id="plugin-output-area" className=" rounded h-128 border-none basis-full">
      {text}
    </div>
  );
};

function arrayTob64(buffer: Uint8Array) {
  var binary = '';
  var bytes = [].slice.call(buffer);
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

export default GetOutputComponent;
