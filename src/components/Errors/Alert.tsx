import React from 'react';

import { DispatchFunc } from '../../types';
interface AlertProps {
  message: string;
  dispatch: DispatchFunc;
}
const Alert: React.FC<AlertProps> = ({ message, dispatch }) => {
  const dismissError = () => {
    dispatch({ type: 'DISMISS_ERROR', payload: null });
  };
  return (
    <div
      className="absolute z-50 bg-black  p-1
     sm:w-full
     "
    >
      <div
        className=" relative flex  border shadow bg-color-warning-lighter card items-center
        gap-1
      "
      >
        <div
          className=" rounded-lg pr-2 text-sm
        md:flex
        "
          role="alert"
        >
          <svg className="w-10 h-10 inline mr-3" fill="red" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col  flex-wrap ">
          <p className="text-center text-base font-semibold">Sorry... </p>
          <p
            className=" p-1 text-base font-medium

          "
          >
            {message}
          </p>
        </div>
        <button
          className="w-1/3 rounded bg-white flex items-center justify-center
        text-md outline outline-1 shadow shadow-black font-bold max-w-[40px] ml-2
        hover:ring hover:ring-black hover:ring-2
        hover:cursor-pointer
        hover:opacity-95
        "
          onClick={dismissError}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Alert;
