import React from 'react';

interface Props {
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (fileData: { moduleData: Uint8Array; moduleName: string }) => void;
  moduleName: string | null;
}

const ModuleLoader: React.FC<Props> = function ({ onChange, moduleName }) {
  const onModuleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { name } = event.target;
    let value: Uint8Array;
    let ele = document.getElementById('selected_file') as HTMLInputElement;
    if (ele.files) {
      let file = ele.files[0];
      const moduleName = file.name;
      file
        .arrayBuffer()
        .then((buffer) => {
          const UINT_8 = new Uint8Array(buffer);
          value = UINT_8;

          return value;
        })
        .then((value) => {
          const fileData = { moduleData: value, moduleName };
          onChange(fileData);
        });
    }
  };
  return (
    <div className=" py-2 basis-10/12 gap-4 items-center flex ">
      <input
        onChange={onModuleInputChange}
        type="file"
        name="moduleData"
        id="selected_file"
        accept=".wasm"
        className="hidden"
      />
      <input
        type="button"
        value="Upload Module"
        className="border-none basis-2/12 rounded    p-2 hover:cursor-pointer text-lg font-bold bg-gray-200 hover:bg-secondary-darker"
        onClick={(e) => {
          const ele = document.getElementById('selected_file') as HTMLInputElement;
          ele.click();
        }}
      />
      {moduleName ? (
        <p className="basis-10/12  h-11 p-2 text-lg   flex ">{moduleName}</p>
      ) : (
        <p className="text-mid-gray ">No file chosen</p>
      )}
    </div>
  );
};

export default ModuleLoader;

/**
 *
 *
 *     <div className=" flex basis-[12.3333%] items-center gap-4 ">
      <input
        onChange={onModuleInputChange}
        type="file"
        name="moduleData"
        id="selected_file"
        accept=".wasm"
        className="hidden"
      />
      <input
        type="button"
        value="Upload Module"
        className="border-none basis-9/12 rounded min-h-[45px] rounded  basis-1/12  p-3 hover:cursor-pointer text-lg font-bold bg-gray-200 hover:bg-secondary-darker"
        onClick={(e) => {
          const ele = document.getElementById('selected_file') as HTMLInputElement;
          ele.click();
        }}
      />
    </div>
 */
