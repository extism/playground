import React from 'react';
import { MimeTypes } from '../../util/MimeTypes';
import GetOutputComponent from './GetOutputComponent';
import './PluginOutput.css';
interface PluginOutputProps {
  output: Uint8Array;
  input: Uint8Array;
  onChange: any;
  mimeType: string;
}

const PluginOutput: React.FC<PluginOutputProps> = ({ output, mimeType, onChange }) => {
  const OutputComponent = GetOutputComponent(mimeType, output);
  console.log(OutputComponent);

  return (
    <div className="plugin-output-textarea-container">
      <div className="drop-down-button-container">
        <label className="func-name-label" htmlFor="select_mime_type">
          Output Type:
        </label>
        <select
          id="select_mime_type"
          name="outputMimeType"
          onChange={(e) => {
            onChange(e);
          }}
          value={mimeType}
        >
          {MimeTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="plugin-output-textarea-label-container">
        <label className="plugin-output-textarea-label" htmlFor="plugin-output-textarea">
          Plugin Output:
        </label>
        {OutputComponent}
      </div>
    </div>
  );
};

export default PluginOutput;
