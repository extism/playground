import React from 'react';

import './PluginInputOutputWrapper.css';

// I receive some data from App that tells me what kind of input/ output to render.
interface PluginInputOutputWrapperProps {
  mimeType: string;
  onChange: any;
}

const PluginInputOutputWrapper: React.FC<PluginInputOutputWrapperProps> = function ({ mimeType, onChange }) {
  return <div className="plugin-input-output-wrapper"></div>;
};

export default PluginInputOutputWrapper;
