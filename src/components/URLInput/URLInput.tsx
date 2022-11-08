import React from 'react';
import './URLInput.css';

const URLInput: React.FC = function () {
  return (
    <div className="url-input-container">
      <label className="url-text-input" htmlFor="module-url-input">
        Module Url:
      </label>
      <input type="text" name="module-url-input" id="module-url-input" />
    </div>
  );
};

export default URLInput;
