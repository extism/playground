import React, { useState } from 'react';

interface URLInputProps {
  onChange: React.FocusEventHandler<HTMLInputElement>;
  url: string;
  defaultUrl: string;
};

const URLInput: React.FC<URLInputProps> = ({ onChange, url, defaultUrl }) => {
  const [urlInput, setUrlInput] = useState(url);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  };

  const onInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col py-1  basis-full  sm:gap-2 sm:flex-row sm:items-center sm:basis-3/4 ">
      <b className=" py-1 pr-1 font-semibold text-sm md:font-bold md:text-lg lg:w-[20%]">Module URL:</b>
      <input
        onKeyDown={onInputKeydown}
        onBlur={onChange}
        className="text-mid-gray bg-background-lightest hover:border-primary-accent w-9/12  sm:h-10  md:h-11 md:w-9/12 lg:w-[80%] "
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
