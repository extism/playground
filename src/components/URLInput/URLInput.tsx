// @ts-nocheck
import React, { useState } from 'react';
// import Button from '../Buttons/DefaultButton/Button';
import './URLInput.css';

interface URLInputProps {
  onChange: (e: Event) => void;
  url: string;
  defaultUrl: string;
}
const URLInput: React.FC<URLInputProps> = ({ onChange, url, defaultUrl }) => {
  const [urlInput, setUrlInput] = useState(url);

  const handleURLChange = (e: any) => {
    setUrlInput((prevState) => e.target.value);
  };

  const onInputBlur = (e: any) => {
    onChange(e);
  };
  const onInputKeydown = (e: any) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };
  return (
    <div className="flex  items-center  py-1  basis-full  sm:gap-2  ">
      <b className=" py-1 pr-1 font-semibold text-sm md:font-bold md:text-lg">Module URL:</b>
      <input
        onKeyDown={onInputKeydown}
        onBlur={onInputBlur}
        className="text-mid-gray bg-background-lightest hover:border-primary-accent w-9/12  sm:h-8  md:h-11 md:w-9/12 lg:w-[80%] "
        // className=" text-mid-gray bg-background-lightest  hover:border-primary-accent w-10/12 p-2  text-sm  accent-black md:basis-10/12  md:h-11 md:p-3 md:text-lg  "
        type="url"
        pattern="https://.*"
        required
        placeholder={defaultUrl}
        value={urlInput}
        onChange={handleURLChange}
        name="moduleData"
      />
    </div>
  );
};

export default URLInput;
