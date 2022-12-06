import React, { useRef } from 'react';
import arrayTob64 from '../../lib/arrayToB64';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, oneLight, materialOceanic, coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { JSONPath } from 'jsonpath-plus';
import Spinner from '../Spinner/Spinner';
import { DispatchFunc } from '../../types';
import TESTJSON from '../../assets/test.json';


type OutputComponentProps = {
  bytes: Uint8Array;
  dispatch: DispatchFunc;
};

const GetOutputComponent = (loading: boolean, outputType: string): React.FC<OutputComponentProps> => {
  if (loading) return LoadingScreen;

  switch (outputType) {
    case 'application/json':
      return JSONOutput;
    case 'text/html':
      return HTMLOutput;
    case 'text/markdown':
      return MarkdownOutput;
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
      return ImageOutput(outputType);
    case 'text/plain':
    default:
      return PlainText;
  }
};

const LoadingScreen: React.FC<OutputComponentProps> = () => {
  return (
    <div className="flex items-center justify-center py-50">
      <Spinner />
    </div>
  );
};

const PlainText: React.FC<OutputComponentProps> = ({ bytes }) => {
  const text = new TextDecoder().decode(bytes);

  return (
    <textarea className="output-text-component rounded p-2" id="plugin-output-area" name="output" disabled value={text}>
      {text}
    </textarea>
  );
};

const HTMLOutput: React.FC<OutputComponentProps> = ({ bytes }) => {
  const text = new TextDecoder().decode(bytes);

  return (
    <div id="plugin-output-area" className="output-text-component">
        <iframe
          title="html-output"
          width="100%"
          height="100%"
          srcDoc={text}
          referrerPolicy="no-referrer"
          allow="fullscreen"
          sandbox="allow-scripts"
        ></iframe>
    </div>
  );
};
const MarkdownOutput: React.FC<OutputComponentProps> = ({ bytes }) => {
  const text = new TextDecoder().decode(bytes);

  return (
    <div id="plugin-output-area" className="output-text-component">
      <SyntaxHighlighter
        className="break-all max-h-full w-full  overflow-scroll whitespace-pre-wrap"
        language="markdown"
        wrapLongLines={true}
        style={oneLight}
        codeTagProps={{ style: { wordBreak: 'break-word' } }}
        customStyle={{ margin: 0 }}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
};

const JSONOutput: React.FC<OutputComponentProps> = ({ bytes }) => {
  const text = new TextDecoder().decode(bytes);
  let data = JSON.parse(JSON.stringify(text, null, 4));

  return (
    <div className="output-text-component">
      <SyntaxHighlighter
        className="bg-blue break-all max-h-full w-full overflow-scroll whitespace-pre-wrap"
        language="json"
        wrapLongLines={true}
        style={oneLight}
        codeTagProps={{ id: 'syntax-highlighter', style: { wordBreak: 'break-word' } }}
        customStyle={{ margin: 0 }}
      >
        {data}
      </SyntaxHighlighter>
    </div>
  );
};

const ImageOutput = (mimeType: string): React.FC<OutputComponentProps> => {
  return function ImageOutputComponent({ bytes }) {
    const data = arrayTob64(bytes);
    const outputImageRef = useRef<HTMLImageElement>(null);

    const onDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('text/uri-list', outputImageRef.current!.src);
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'all';
    };

    return (
      <div className="output-image-component-wrapper">
        <img
          ref={outputImageRef}
          draggable
          onDragStart={onDragStart}
          className="object-contain h-full rounded max-h-full w-full"
          id="plugin-output-area"
          src={`data:${mimeType};base64,${data}`}
          alt=""
        />
      </div>
    );
  };
};

export default GetOutputComponent;
