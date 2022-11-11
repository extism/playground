// @ts-nocheck
import React from 'react';
// import Button from '../Buttons/DefaultButton/Button';
import './URLInput.css';

interface URLInputProps {
  onChange: (e: Event) => void;
  currentUrl: string;
  defaultUrl: string;
}
const URLInput: React.FC<URLInputProps> = ({ onChange, currentUrl, defaultUrl }) => {
  return (
    <div className="flex flex-col items-start gap-1 rounded text-xl ">
      <label
        htmlFor="upload_module"
        className=" p-3 flex gap-2  text-lg rounded  text-xl font-bold  text-black-700  hover:shadow-lg bg-teal hover:text-white hover:underline"
      >
        Upload Module <span className="inline-block">↓</span>
        <input type="file" className="hidden" id="upload_module" accept=".wasm" />
      </label>
      <div className="flex flex-wrap w-full">
        <label className="text-left font-semibold rounded text-black-700 p-3" htmlFor="module-url-input">
          Module Url:
        </label>
        <input
          onChange={(e) => {
            onChange(e);
          }}
          className="url-text-input p-3 rounded font-normal  text-lg"
          type="text"
          name="url"
          id="module-url-input"
          placeholder={defaultUrl}
          value={currentUrl}
        />
      </div>
    </div>
  );
};

export default URLInput;
