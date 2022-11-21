import React from 'react';

interface Props {
  title: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options?: any;
  value: string;
};

const FunctionDropDownMenu: React.FC<Props> = function ({ title, onChange, options, value }) {
  return (
    <div className="flex text-2xl">
      <label className="self-center pb-1 px-4 font-bold" htmlFor="func_name">
        {title}
      </label>
      <select
        name="func_name"
        id="func_name"
        className=" py-3 px-4 self-center border-solid border text-string-red border-black text-xl font-normal font-mono"
        value={value}
        onChange={onChange}
      >
        {options}
      </select>
    </div>
  );
};

export default FunctionDropDownMenu;
