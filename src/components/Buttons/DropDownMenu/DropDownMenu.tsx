import React from 'react';
import './DropDownMenu.css';

interface DropDownMenuProps {
  title: string;
  onChange: any;
  options?: any;
  mimeType: string;
  selectName: string;
}
const DropDownMenu: React.FC<DropDownMenuProps> = function ({ title, onChange, options, mimeType, selectName }) {
  return (
    <div className="drop-down-button-container">
      <label className="func-name-label" htmlFor="func_name">
        {title}
      </label>
      <select name={selectName} id="func_name" className="funcName" value={mimeType} onChange={(e) => onChange(e)}>
        {options}
      </select>
    </div>
  );
};

export default DropDownMenu;
