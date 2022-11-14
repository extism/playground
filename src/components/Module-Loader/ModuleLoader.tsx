import React from 'react';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModuleLoader: React.FC<Props> = function ({ onChange }) {
  const onModuleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { name } = event.target;
    let value: Uint8Array;
    let ele = document.getElementById('selected_file') as HTMLInputElement;
    if (ele.files) {
      let file = ele.files[0];
      file
        .arrayBuffer()
        .then((buffer) => {
          const UINT_8 = new Uint8Array(buffer);
          value = UINT_8;
          return value;
        })
        .then((value) => {
          const e = { name, value };
          onChange(e as any);
        });
    }
  };
  return (
    <div className=" flex basis-[12.3333%] items-center gap-4 ">
      <input onChange={onModuleInputChange} type="file" name="moduleData" id="selected_file" className="hidden" />
      <input
        type="button"
        value="Upload Module"
        className="border-none basis-9/12 rounded min-h-[45px] rounded  basis-1/12  p-3 hover:cursor-pointer text-lg font-bold bg-gray-200 hover:bg-secondary-darker"
        onClick={(e) => {
          const ele = document.getElementById('selected_file') as HTMLInputElement;
          ele.click();
        }}
      />
      <span className="basis-2/12">or</span>
    </div>
  );
};

export default ModuleLoader;
