import React from 'react';
import './ModuleUploadWrapper.css';
import URLInput from '../URLInput/URLInput';
import Button from '../Buttons/DefaultButton/Button';
import DropDownButton from '../Buttons/DropDownButton/DropDownButton';

const ModuleUploadWrapper: React.FC = function () {
  return (
    <div className="module-upload-wrapper">
      <URLInput />
      <Button title="Upload Module" />
      <DropDownButton title="Function Name:" onChange={() => {}} />
    </div>
  );
};

export default ModuleUploadWrapper;
