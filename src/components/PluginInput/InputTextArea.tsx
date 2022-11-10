import React, { useRef, useState } from 'react';
import { MimeTypes } from '../../util/MimeTypes';
import DropDownMenu from '../Buttons/DropDownMenu/DropDownMenu';
import './InputTextArea.css';
interface InputTextAreaProps {
  input: Uint8Array;
  label: string;
  dropDownTitle: string;
  mimeType: string;
  onChange: any;
  onKeyDown: any;
  handleDrop: any;
}
const InputTextArea: React.FC<InputTextAreaProps> = function ({
  input,
  handleDrop,
  label,
  dropDownTitle,
  mimeType,
  onChange,
  onKeyDown,
}) {
  const [textAreaValue, setTextAreaValue] = useState('');
  const mimeOptions = MimeTypes.map((m, i) => <option key={i}>{m}</option>);
  const drag_area_ref = useRef<HTMLTextAreaElement>(null);

  const inputChangeHandler = (e: any) => {
    const toEncoded = new TextEncoder().encode(e.target.value);
    setTextAreaValue(e.target.value);
    onChange({ target: { name: 'input', value: toEncoded } });
  };

  const readFile = (file: Blob) => {
    const reader = new FileReader();

    if (file.type === 'text/html' || file.type === 'text/plain') {
      reader.readAsText(file);
      reader.onload = (event: any) => {
        const uploadedFile = event.target?.result;
        const toEncoded = new TextEncoder().encode(uploadedFile);
        setTextAreaValue(uploadedFile);
        onChange({ target: { name: 'input', value: toEncoded } });
        //  for future Ref: makes Iframe HTML File
        // const iframe = document.createElement('iframe');
        // iframe.srcdoc = uploadedFile;
        // document.body.appendChild(iframe);
      };
      return;
    } else if (file.type === 'image/png' || file.type === 'image/jpg') {
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const uploaded_file = event.target?.result;
        drag_area_ref.current!.style.backgroundImage = `url(${uploaded_file})`;
      };
    }

    // need a json reader...
  };

  const onDropHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const fileList = event.dataTransfer?.files;
    if (fileList) {
      const file = fileList[0];
      readFile(file);
    }

    drag_area_ref.current!.style.opacity = '1';
    drag_area_ref.current!.style.backgroundColor = 'initial';
    handleDrop(event);
  };

  const onDragOverHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
      event.dataTransfer.effectAllowed = 'copyMove';
    }
    drag_area_ref.current!.style.backgroundColor = '#a49cd6';
    drag_area_ref.current!.style.opacity = '0.5';
  };

  const onDragLeaveHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    drag_area_ref.current!.style.backgroundColor = 'white';
  };

  return (
    <div className="plugin-input-textarea-container">
      <DropDownMenu
        mimeType={mimeType}
        selectName="inputMimeType"
        title={dropDownTitle}
        onChange={onChange}
        options={mimeOptions}
      />
      <div className="plugin-input-textarea-label-container">
        <label className="plugin-input-text-area-label" htmlFor="plugin-input-textarea">
          {label}:
        </label>

        <textarea
          ref={drag_area_ref}
          className="input-text-area"
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
          onKeyDown={onKeyDown}
          onChange={inputChangeHandler}
          value={textAreaValue}
          name="input"
          rows={15}
          id="plugin-input-textarea"
        />
      </div>
    </div>
  );
};

export default InputTextArea;
