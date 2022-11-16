// @ts-nocheck
import React, { useRef, useState } from 'react';
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
    <div className="py-2 basis-10/12 items-center flex">
      <b className="basis-2/12">Module URL:</b>
      <input
        onKeyDown={onInputKeydown}
        onBlur={onInputBlur}
        className="basis-10/12 accent-black h-11 p-3 text-lg  text-mid-gray bg-background-lightest  hover:border-primary-accent"
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
