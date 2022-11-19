import React from 'react';
import GetOutputComponent from './GetOutputComponent';

import './PluginOutput.css';
interface PluginOutputProps {
  output: Uint8Array;
  dispatch: (action: { type: string; payload: any }) => void;
  input: Uint8Array;
  mimeType: string;
}

const PluginOutput: React.FC<PluginOutputProps> = ({ output, mimeType, dispatch }) => {
  const OutputComponent = GetOutputComponent(mimeType);

  return (
    <div className="border-black border-2  border-solid max-h-full self-stretch basis-full ">
      <div className="md:h-128 w-full ">
        <OutputComponent dispatch={dispatch} bytes={output} />
      </div>
    </div>
  );
};

export default PluginOutput;
