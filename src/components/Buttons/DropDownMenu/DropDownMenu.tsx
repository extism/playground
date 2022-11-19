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
    <div
      onDragOver={(e: React.DragEvent) => {
        e.preventDefault();
      }}
      className=" flex items-center lg:min-w-[200px] ml-auto justify-end  "
    >
      <label
        className=" md:h-11 md:flex gap-1 items-center  text-left  text-sm text-mid-gray bg-background-lightest  rounded  p-3 font-semibold "
        htmlFor="func_name"
      >
        {title}: <span className="font-mono font-medium text-string-red">{mimeType}</span>
      </label>
      <select
        name={selectName}
        id="func_name"
        required
        // className="funcName border-solid border-black"
        className=" pt-10  bg-fit bg-dark-blue  bg-no-repeat bg-center  bg-[url('/src/assets/chevron-right.png')] basis-1/12 h-11 w-8 rounded relative overflow-hidden appearance-none "
        value={mimeType}
        onChange={(e) => onChange(e)}
      >
        {options}
      </select>
    </div>
  );
};

export default DropDownMenu;
