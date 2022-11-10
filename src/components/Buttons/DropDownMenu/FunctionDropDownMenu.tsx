import React from 'react';
import './DropDownMenu.css';

interface Props {
  title: string;
  onChange: any;
  options?: any;
  value: string;
}
const FunctionDropDownMenu: React.FC<Props> = function ({ title, onChange, options, value }) {
  return (
    <div className="drop-down-button-container">
      <label className="func-name-label" htmlFor="func_name">
        {title}
      </label>
      <select
        name="func_name"
        id="func_name"
        className="funcName"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
      >
        {options}
      </select>
    </div>
  );
};

export default FunctionDropDownMenu;
