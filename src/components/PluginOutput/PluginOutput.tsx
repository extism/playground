import React from 'react';
import { MimeTypes } from '../../util/MimeTypes';
import DropDownMenu from '../Buttons/DropDownMenu/DropDownMenu';
import GetOutputComponent from './GetOutputComponent';
import './PluginOutput.css';
interface PluginOutputProps {
  output: Uint8Array;
  dispatch: (action: { type: string; payload: { outputMimeType: string } }) => void;
  input: Uint8Array;
  mimeType: string;
}

const PluginOutput: React.FC<PluginOutputProps> = ({ output, mimeType, dispatch }) => {
  const OutputComponent = GetOutputComponent(mimeType);
  const mimeOptions = MimeTypes.map((m, i) => <option key={i}>{m}</option>);

  const handleDropDownChange = (e: React.ChangeEvent) => {
    const element = e.target as HTMLSelectElement;
    const outputMimeType = element.value;
    console.log(outputMimeType, 'here');

    dispatch({ type: 'OUTPUT_MIME_TYPE', payload: { outputMimeType } });
  };

  return (
    <div className="grid">
      <DropDownMenu
        title="Output Type"
        onChange={handleDropDownChange}
        options={mimeOptions}
        mimeType={mimeType}
        selectName={'outputMimeType'}
      />

      <div className="flex flex-col self-stretch h-128 max-h-full ">
        <label
          className="text-white bg-black pt-2  px-3 self-start pb-4 font-bold h-10 max-h-full rounded-t-lg"
          htmlFor="plugin-output-textarea"
        >
          Plugin Output:
        </label>
        <div className="border-solid  border-black border basis-full rounded flex">
          <OutputComponent bytes={output} />
        </div>
      </div>
    </div>
  );
};

export default PluginOutput;
