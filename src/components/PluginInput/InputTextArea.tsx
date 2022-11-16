import React, { useRef, useState } from 'react';
import { MimeTypes } from '../../util/MimeTypes';
import DropDownMenu from '../Buttons/DropDownMenu/DropDownMenu';
import './InputTextArea.css';
interface InputTextAreaProps {
  input: Uint8Array;
  label: string;
  dropDownTitle: string;
  mimeType: string;
  dispatch: (action: { type: string; payload: { inputMimeType: string } }) => void;
  onChange: any;
  onKeyDown: any;
  handleDrop: any;
}
const InputTextArea: React.FC<InputTextAreaProps> = function ({
  input,
  handleDrop,
  dispatch,
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
    onChange({ input: toEncoded });
  };

  const readFile = (file: Blob) => {
    const reader = new FileReader();

    if (file.type === 'text/html' || file.type === 'text/plain' || file.type === 'text/markdown') {
      reader.readAsText(file);
      reader.onload = (event: any) => {
        const uploadedFile = event.target?.result;
        const toEncoded = new TextEncoder().encode(uploadedFile);
        setTextAreaValue(uploadedFile);

        onChange({ input: toEncoded });
        //  for future Ref: makes Iframe HTML File
        // const iframe = document.createElement('iframe');
        // iframe.srcdoc = uploadedFile;
        // document.body.appendChild(iframe);
      };
      return;
    } else if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const uploaded_file = event.target?.result;
        drag_area_ref.current!.style.backgroundImage = `url(${uploaded_file})`;
      };
    }
    setTextAreaValue('');
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
  const handleDropDownChange = (e: React.ChangeEvent) => {
    const element = e.target as HTMLSelectElement;
    const inputMimeType = element.value;
    dispatch({ type: 'INPUT_MIME_TYPE', payload: { inputMimeType } });
  };

  return (
    <div className="grid">
      <DropDownMenu
        mimeType={mimeType}
        selectName="inputMimeType"
        title={dropDownTitle}
        onChange={handleDropDownChange}
        options={mimeOptions}
      />
      <div className="flex flex-col h-128  self-stretch max-h-full ">
        <label
          className="text-white bg-black pt-2  px-3 self-start pb-4 font-bold h-10 max-h-full  rounded-t-lg"
          htmlFor="plugin-input-textarea"
        >
          {label}:
        </label>
        <div className="border-solid   border-black border rounded basis-full flex ">
          <textarea
            ref={drag_area_ref}
            className="  rounded h-128 w-full p-2 basis-full border-none"
            onDragOver={onDragOverHandler}
            onDragLeave={onDragLeaveHandler}
            onDrop={onDropHandler}
            onKeyDown={onKeyDown}
            onChange={inputChangeHandler}
            value={textAreaValue}
            placeholder="enter text or drop file..."
            name="input"
            rows={15}
            id="plugin-input-textarea"
          />
        </div>
      </div>
    </div>
  );
};

export default InputTextArea;
