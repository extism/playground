import React from 'react';

interface DropDownMenuProps {
  title: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options?: any;
  mimeType: string;
  selectName: string;
};

const DropDownMenu: React.FC<DropDownMenuProps> = function ({ title, onChange, options, mimeType, selectName }) {
  return (
    <div
      onDragOver={(e: React.DragEvent) => e.preventDefault()}
      className=" flex items-center lg:min-w-[200px] ml-auto justify-end  "
    >
      <label
        className=" md:h-11 md:flex gap-1 items-center  text-left  text-sm text-mid-gray bg-background-lightest  rounded  p-3 font-semibold "
        htmlFor="func_name"
      >
        {title}:
      </label>
      <select
        name={selectName}
        id="func_name"
        required
        // className="funcName border-solid border-black"
        className=""
        value={mimeType}
        onChange={onChange}
      >
        {options}
      </select>
    </div>
  );
};

export default DropDownMenu;
