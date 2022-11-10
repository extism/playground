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

  const readImage = (file: Blob) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const uploaded_image = event.target?.result;
      drag_area_ref.current!.style.backgroundImage = `url(${uploaded_image})`;
    };
    // const e = { target: { name: 'input', value: file.type } };
    // onChange(e);
    reader.readAsDataURL(file);
  };

  const onDropHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const fileList = event.dataTransfer?.files;
    if (fileList) {
      readImage(fileList[0]);
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
      <DropDownMenu name={mimeType} value="hello" title={dropDownTitle} onChange={onChange} options={mimeOptions} />
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
