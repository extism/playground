import React from 'react';
import './DropDownMenu.css';

interface Props {
  title: string;
  onChange: () => void;
  options?: any;
}
const DropDownMenu: React.FC<Props> = function ({ title, onChange, options }) {
  return (
    <div className="drop-down-button-container">
      <label className="func-name-label" htmlFor="func_name">
        {title}
      </label>
      <select name="func_name" id="func_name" className="funcName" value="placeholder" onChange={onChange}>
        {options}
      </select>
    </div>
  );
};

export default DropDownMenu;
