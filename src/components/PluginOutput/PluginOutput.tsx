import React from 'react';
import { DispatchFunc } from '../../types';
import GetOutputComponent from './GetOutputComponent';

interface PluginOutputProps {
  output: Uint8Array;
  dispatch: DispatchFunc;
  input: Uint8Array;
  mimeType: string;
  loading: boolean;
}

const PluginOutput: React.FC<PluginOutputProps> = ({ output, loading, mimeType, dispatch }) => {
  const OutputComponent = GetOutputComponent(loading, mimeType);

  return (
    <div className="border-black border-2 border-solid max-h-full self-stretch basis-full ">
      <div className="md:h-128 w-full ">
        <OutputComponent dispatch={dispatch} bytes={output} />
      </div>
    </div>
  );
};

export default PluginOutput;
