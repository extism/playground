import React from 'react';
import './DropDownButton.css';

interface Props {
  title: string;
  onChange: () => void;
  options?: any;
}
const DropDownButton: React.FC<Props> = function ({ title, onChange, options }) {
  return (
    <div className="drop-down-button-container">
      <label className="func-name-label" htmlFor="func_name">
        {title}
      </label>
      <select name="func_name" id="func_name" className="funcName" value="placeholder" onChange={onChange}>
        <option selected value="">
          --Please choose an option--
        </option>
        <option>MockOptions1 </option>
        <option>MockOptions2 </option>
        <option>MockOptions3 </option>
        <option>MockOptions4 </option>
        <option>MockOptions5 </option>
        <option>MockOptions6 </option>
      </select>
    </div>
  );
};

export default DropDownButton;
