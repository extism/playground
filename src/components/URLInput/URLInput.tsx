import React, { useState } from 'react';

interface URLInputProps {
  onChange: React.FocusEventHandler<HTMLInputElement> | any;
  url: string;
  defaultUrl: string;
}

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
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(e);
  };
  return (
    <div
      className="flex basis-full items-center
    xl:basis-[90%]
    "
    >
      <div
        className="flex flex-col py-1 basis-full sm:gap-2 sm:flex-row sm:items-center sm:basis-3/4
      lg:basis-9/12"
      >
        <b className=" py-1 pr-1 font-semibold text-sm md:font-bold md:text-lg ">Module URL:</b>
        <input
          onBlur={onBlur}
          onKeyDown={onInputKeydown}
          className="w-9/12 sm:h-10 md:h-11 md:w-9/12 lg:w-[80%]"
          type="url"
          pattern="https://.*"
          required
          placeholder={defaultUrl}
          value={urlInput}
          onChange={handleURLChange}
          name="moduleData"
        />
      </div>
      <button
        className="p-2 rounded
        text-sm font-medium


                bg-gray-200
                lg:text-xl lg:font-bold
                hover:cursor-pointer hover:bg-secondary-darker
                hover:ring hover:ring-black hover:ring-2
                hover:opacity-95
                "
        onClick={() => {
          onChange(urlInput);
          console.log('here', urlInput);
        }}
        title="Fetch Module"
      >
        Load Module
      </button>
    </div>
  );
};

export default URLInput;
