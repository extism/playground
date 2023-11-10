import React from 'react';

interface SelectFunctionDropDownProps {
  handleFunctionDropDownChange: React.ChangeEventHandler<HTMLSelectElement>;
  func_name: string;
  functions: WebAssembly.ModuleExportDescriptor[];
}
const SelectFunctionDropDown: React.FC<SelectFunctionDropDownProps> = ({
  handleFunctionDropDownChange,
  func_name,
  functions,
}) => {
  const funcOptions = functions.map((f: WebAssembly.ModuleExportDescriptor, i: number) => {
    return (
      <option key={i} value={f.name}>
        {f.name}
      </option>
    );
  });
  return (
    <div
      className="
        flex
        max-w-[450px]
        lg:grow

     "
    >
      <label
        className=" rounded items-center  text-left
        text-sm text-mid-gray bg-background-lightest
        font-semibold p-3
        sm:min-w-[130px] sm:self-center
        sm:gap-1
        sm:flex sm:items-center

        xl:h-[62px] xl:min-w-[150px]
        xl:text-base
    "
        htmlFor="func_name"
      >
        Function Name:
      </label>

      <select
        autoComplete="off"
        required
        name="func_name"
        id="func_name"
        value={func_name}
        onChange={handleFunctionDropDownChange}
        className="hover:cursor-pointer grow
        font-mono text-string-red
    lg:text-base
    xl:text-lg
    "
      >
        {funcOptions}
      </select>
    </div>
  );
};

export default SelectFunctionDropDown;
