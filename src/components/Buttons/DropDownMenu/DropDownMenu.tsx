import React from 'react';
import './DropDownMenu.css';

interface DropDownMenuProps {
  title: string;
  onChange: any;
  options?: any;
  value: string;
  name: string;
}
const DropDownMenu: React.FC<DropDownMenuProps> = function ({ title, onChange, options, name, value }) {
  return (
    <div className="drop-down-button-container">
      <label className="func-name-label" htmlFor="func_name">
        {title}
      </label>
      <select name={name} id="func_name" className="funcName" value={name} onChange={(e) => onChange(e)}>
        {options}
      </select>
    </div>
  );
};

export default DropDownMenu;
