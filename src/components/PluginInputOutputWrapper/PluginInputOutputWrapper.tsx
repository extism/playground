import React from 'react';
import PluginTextArea from '../PluginTextArea/PluginTextArea';
import './PluginInputOutputWrapper.css';
const PluginInputOutputWrapper: React.FC = function () {
  return (
    <div className="plugin-input-output-wrapper">
      <PluginTextArea label="Plugin Input" dropDownTitle="Input type" />
      <PluginTextArea label="Plugin Output" dropDownTitle="Output Type" />
    </div>
  );
};

export default PluginInputOutputWrapper;
