import React from 'react';

interface Props {
  onChange: (fileData: { moduleData: Uint8Array; moduleName: string }) => void;
  moduleName: string | null;
}

const ModuleLoader: React.FC<Props> = function ({ onChange, moduleName }) {
  const onModuleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let ele = document.getElementById('selected_file') as HTMLInputElement;
    if (ele.files) {
      let file = ele.files[0];
      const moduleName = file.name;
      file
        .arrayBuffer()
        .then(buffer => new Uint8Array(buffer))
        .then(moduleData => onChange({moduleData, moduleName}))
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
        onClick={e => {
          const ele = document.getElementById('selected_file') as HTMLInputElement;
          ele.click();
        }}
      />
      {moduleName ? (
        <p className="basis-10/12  h-11 p-2 text-lg flex ">{moduleName}</p>
      ) : (
        <p className="text-mid-gray ">No file chosen</p>
      )}
    </div>
  );
};

export default ModuleLoader;
