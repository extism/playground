import React, { useRef } from 'react';
import GetInputComponent from './GetInputComponent';

import './InputTextArea.css';
interface PluginInputProps {
  input: Uint8Array;
  label: string;
  dropDownTitle: string;
  mimeType: string;
  dispatch: (action: { type: string; payload: any }) => void;
  handleOnRun: any;
  onChange: any;
  onKeyDown: any;
  handleDrop: any;
}
const PluginInput: React.FC<PluginInputProps> = function ({
  input,
  handleDrop,
  dispatch,
  label,
  dropDownTitle,
  mimeType,
  onChange,
  onKeyDown,
  handleOnRun,
}) {
  const InputComponent = GetInputComponent(mimeType);
  const drag_area_ref = useRef<HTMLDivElement>(null);

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    drag_area_ref.current!.style.backgroundColor = 'white';
    drag_area_ref.current!.style.opacity = '1';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
      e.dataTransfer.effectAllowed = 'all';
    }
    drag_area_ref.current!.style.backgroundColor = '#a49cd6';
    drag_area_ref.current!.style.opacity = '0.5';
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const file = files[0];
    if (file) {
      const type = file.type;
      file.arrayBuffer().then((b: ArrayBuffer) => {
        dispatch({ type: 'INPUT_MIME_TYPE', payload: { inputMimeType: type, input: new Uint8Array(b) } });
      });
    }

    drag_area_ref.current!.style.backgroundColor = 'white';
    drag_area_ref.current!.style.opacity = '1';
  };

  return (
    <div className="border-black h-full border-2 border-solid max-h-full self-stretch basis-full rounded relative ">
      <div
        className="md:h-128 w-full "
        ref={drag_area_ref}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
      >
        <InputComponent dispatch={dispatch} bytes={input} />
      </div>
    </div>
  );
};

export default PluginInput;
