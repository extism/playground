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
    case 'application/json':
      OutputComp = JSONOutput;
      break;
  }
  // @ts-ignore
  return <OutputComp bytes={output} />;
};

const PlainText = ({ bytes }: { bytes: Uint8Array }) => {
  const text = new TextDecoder().decode(bytes);

  return (
    <textarea id="plugin-output-area" rows={15} name="output" disabled value={text}>
      {text}
    </textarea>
  );
};

const ImagePng = ({ bytes }: { bytes: Uint8Array }) => {
  const data = arrayTob64(bytes);
  return <img id="plugin-output-area" src={`data:image/png;base64,${data}`} alt="" />;
};
const ImageJpg = ({ bytes }: { bytes: Uint8Array }) => {
  const data = arrayTob64(bytes);
  return <img id="plugin-output-area" src={`data:image/jpg;base64,${data}`} alt="" />;
};

const JSONOutput = ({ bytes }: { bytes: Uint8Array }) => {
  const text = new TextDecoder().decode(bytes);
  //  const toJson = JSON.stringify(null, 2, JSON.parse(text))
  return <div id="plugin-output-area">{text}</div>;
};

function arrayTob64(buffer: Uint8Array) {
  var binary = '';
  var bytes = [].slice.call(buffer);
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

export default GetOutputComponent;
