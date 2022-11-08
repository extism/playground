import React from 'react';
import DropDownMenu from '../Buttons/DropDownMenu/DropDownMenu';
import './PluginOutput.css';
interface PluginOutputProps {
  output: any;
  label: string;
  onChange: any;
  dropDownTitle: string;
}
const PluginOutput: React.FC<PluginOutputProps> = ({ output, label, dropDownTitle, onChange }) => {
  return (
    <div className="plugin-output-textarea-container">
      <DropDownMenu title={dropDownTitle} onChange={onChange} />
      <div className="plugin-output-textarea-label-container">
        <label className="plugin-output-textarea-label" htmlFor="plugin-output-textarea">
          {label}:
        </label>
        <textarea
          disabled
          defaultValue={output}
          onChange={onChange}
          name="output"
          rows={15}
          id="plugin-output-textarea"
        />
      </div>
    </div>
  );
};

export default PluginOutput;
