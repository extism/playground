import React from 'react';
import { MimeTypes } from '../../util/MimeTypes';
import DropDownMenu from '../Buttons/DropDownMenu/DropDownMenu';
import GetOutputComponent from './GetOutputComponent';
import './PluginOutput.css';
interface PluginOutputProps {
  output: Uint8Array;
  input: Uint8Array;
  onChange: any;
  mimeType: string;
}

const PluginOutput: React.FC<PluginOutputProps> = ({ output, mimeType, onChange }) => {
  const OutputComponent = GetOutputComponent(mimeType, output);
  const mimeOptions = MimeTypes.map((m, i) => <option key={i}>{m}</option>);

  return (
    <div className="plugin-output-textarea-container">
      <DropDownMenu
        title="Output Type"
        onChange={onChange}
        options={mimeOptions}
        mimeType={mimeType}
        selectName={'outputMimeType'}
      />

      <div className="plugin-output-textarea-label-container">
        <label className="plugin-output-textarea-label" htmlFor="plugin-output-textarea">
          Plugin Output:
        </label>
        {OutputComponent}
      </div>
    </div>
  );
};

export default PluginOutput;
