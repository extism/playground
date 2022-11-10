import React from 'react';
import DropDownMenu from '../Buttons/DropDownMenu/DropDownMenu';
import './PluginTextArea.css';
interface PluginTextAreaProps {
  label: string;
  dropDownTitle: string;
}
const PluginTextArea: React.FC<PluginTextAreaProps> = function ({ label, dropDownTitle }) {
  const lowerCaseLabel = label.toLowerCase().split(' ').join('-');
  return (
    <div className={`${lowerCaseLabel}-text-area-container`}>
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
