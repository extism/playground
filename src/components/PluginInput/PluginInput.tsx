import React, { useRef } from 'react';
import { DispatchFunc } from '../../types';
import GetInputComponent from './GetInputComponent';

interface PluginInputProps {
  input: Uint8Array;
  mimeType: string;
  dispatch: DispatchFunc;
}

const PluginInput: React.FC<PluginInputProps> = function ({ input, dispatch, mimeType }) {
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
    try {
      const files = e.dataTransfer.files;
      if (files.length > 1) {
        const error = new Error();
        error.message = 'Only one file please';
        throw new Error('Only one file please');
      }
      const file = files[0];
      if (file) {
        const type = file.type;
        file.arrayBuffer().then((b: ArrayBuffer) => {
          dispatch({ type: 'INPUT_MIME_TYPE', payload: { inputMimeType: type, input: new Uint8Array(b) } });
        });
      }

      drag_area_ref.current!.style.backgroundColor = 'white';
      drag_area_ref.current!.style.opacity = '1';
    } catch (error) {
      dispatch({ type: 'ERROR_ON_DROP', payload: { error } });
    }
  };

  return (
    <div
      className="border-black border-2 border-solid  rounded
h-[20rem]
lg:h-80
xl:h-96
"
    >
      <div
        className="h-full w-full "
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
