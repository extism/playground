import React from 'react';
import DropDownMenu from '../Buttons/DropDownMenu/DropDownMenu';
import './InputTextArea.css';
import { MimeTypes } from '../../util/MimeTypes';
interface InputTextAreaProps {
  input: string;
  label: string;
  dropDownTitle: string;
  onChange: any;
}
const InputTextArea: React.FC<InputTextAreaProps> = function ({ input, label, dropDownTitle, onChange }) {
  const mimeOptions = MimeTypes.map((m, i) => <option key={i}>{m}</option>);
  return (
    <div className="plugin-input-textarea-container">
      <DropDownMenu title={dropDownTitle} onChange={onChange} options={mimeOptions} />
      <div className="plugin-input-textarea-label-container">
        <label className="plugin-input-text-area-label" htmlFor="plugin-input-textarea">
          {label}:
        </label>
        <textarea onChange={onChange} value={input} name="input" rows={15} id="plugin-input-textarea" />
      </div>
    </div>
  );
};

export default InputTextArea;
