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
      className="flex flex-col gap-1  basis-full  py-2
        sm:gap-2 sm:flex-row sm:flex-wrap sm:items-center
        lg:flex-nowrap
        "
    >
      <label
        htmlFor="url_module_text_input"
        className=" font-medium text-sm max-w-[100px]
        sm:font-semibold sm:text-base
        md:text-lg md:max-w-[115px]
        md:font-bold lg:w-1/3
        "
      >
        Module URL:
      </label>
      <input
        id="url_module_text_input"
        onBlur={onBlur}
        onKeyDown={onInputKeydown}
        className=" basis-full  text-sm
        sm:text-base
        lg:basis-[10/12] lg:max-w-[600px] lg:text-lg
        xl:basis-11/12 xl:max-w-[750px]
        2xl:max-w-[unset]

"
        type="url"
        pattern="https://.*"
        required
        placeholder={defaultUrl}
        value={urlInput}
        onChange={handleURLChange}
        name="moduleData"
      />
      <button
        className="p-2 rounded
         text-base
         font-semibold
         sm:basis-full
         sm:mx-auto
         bg-gray-200
         lg:text-xl lg:font-bold
         lg:basis-1/5
         hover:cursor-pointer hover:bg-secondary-darker
         hover:ring hover:ring-black hover:ring-2
         hover:opacity-95
                "
        onClick={() => {
          onChange(urlInput);
        }}
        title="Fetch Module"
      >
        Load Module
      </button>
    </div>
  );
};

export default URLInput;
