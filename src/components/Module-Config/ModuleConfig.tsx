import React from 'react';
import { DispatchFunc } from '../../types';
interface ModuleConfigProps {
  dispatch: DispatchFunc;
  uploadType: string;
}
const ModuleConfig: React.FC<ModuleConfigProps> = ({ dispatch, uploadType }) => {
  return (
    <div
      className=" my-2
     md:flex  md:gap-2  md:items-center "
    >
      <label
        className="max-w-[165px] text-sm font-medium
        sm:font-semibold sm:text-base
        md:text-lg md:font-bold
        md:basis-2/4
"
      >
        Load Module From:
      </label>
      <form
        className="
         text-sm   basis-10/12
       sm:flex  sm:items-center md:gap-2"
      >
        <input
          className="form-radio ml-2"
          onChange={() => {
            dispatch({ type: 'UPLOAD_TYPE', payload: 'url' });
          }}
          value="url"
          type="radio"
          checked={uploadType === 'url'}
          name="uploadType"
          id="use_url"
        />
        <label
          className=" px-1 text-base font-medium
        md:text-lg md:font-semibold
        lg:font-bold
        "
          htmlFor="use_url"
        >
          URL
        </label>
        <input
          className="form-radio"
          value="module"
          onChange={() => {
            dispatch({ type: 'UPLOAD_TYPE', payload: 'module' });
          }}
          checked={uploadType === 'module'}
          type="radio"
          name="uploadType"
          id="use_module"
        />

        <label
          className=" px-1  text-base font-medium
             md:text-lg md:font-semibold
             lg:font-bold  "
          htmlFor="use_module"
        >
          Local File
        </label>
      </form>
    </div>
  );
};

export default ModuleConfig;
