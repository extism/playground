import React from 'react';
import DropDownButton from '../Buttons/DropDownButton/DropDownButton';
import './PluginTextArea.css';
interface PluginTextAreaProps {
  label: string;
  dropDownTitle: string;
}
const PluginTextArea: React.FC<PluginTextAreaProps> = function ({ label, dropDownTitle }) {
  const lowerCaseLabel = label.toLowerCase().split(' ').join('-');
  return (
    <div className={`${lowerCaseLabel}-text-area-container`}>
      <DropDownButton title={dropDownTitle} onChange={() => {}} />
      <div className="textarea-label-container">
        <label className="text-area-label" htmlFor={`${lowerCaseLabel}-textarea`}>
          {label}:
        </label>
        <textarea rows={15} id={`${lowerCaseLabel}-textarea`} />
      </div>
    </div>
  );
};

export default PluginTextArea;
