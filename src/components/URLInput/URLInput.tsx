// @ts-nocheck
import React from 'react';
import './URLInput.css';

interface URLInputProps {
  onChange: (e: Event) => void;
  currentUrl: string;
}
const URLInput: React.FC<URLInputProps> = ({ onChange, currentUrl }) => {
  return (
    <div className="url-input-container">
      <label className="url-text-label" htmlFor="module-url-input">
        Module Url:
      </label>
      <input
        onChange={(e) => {
          onChange(e);
        }}
        className="url-text-input"
        type="text"
        name="url"
        id="module-url-input"
        value={currentUrl}
      />
    </div>
  );
};

export default URLInput;
