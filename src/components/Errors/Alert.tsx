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

  const renderMessage = () => {
    return message === `Sorry! We currently don't support WASI.` ? (
      <div
        className="text-base
    md:text-lg"
      >
        <pre
          className="overflow-y-auto whitespace-pre-wrap
      max-h-[175px]
      sm:max-h-[300px]
      md:overflow-x-hidden
      "
        >
          {message}
          Track the issue at{' '}
          <a
            className="text-color-danger-dark underline
            hover:underline-offset-2
            hover:font-semibold
            "
            target="_blank"
            rel="noreferrer"
            href="https://github.com/extism/extism/issues/160"
          >
            https://github.com/extism/extism/issues/160
          </a>
        </pre>
      </div>
    ) : (
      <div
        className="text-base
            md:text-lg"
      >
        <pre
          className="overflow-y-auto whitespace-pre-wrap
              max-h-[175px]
              sm:max-h-[300px]
              md:overflow-x-hidden
              "
        >
          {message}
        </pre>
      </div>
    );
  };
  return (
    <div className="">
      <div
        id="content"
        className="absolute z-50 bg-color-warning-lighter
      left-0 right-0 ml-auto mr-auto
      rounded-lg
      outline outline-2
      w-[325px]
      md:w-[450px]
      lg:w-[550px]"
      >
        <div
          className="SVG_CONTAINER
         bg-error-background
         flex justify-center py-3 rounded-lg border-b-2  rounded-b-none border-black

        "
          role="alert"
        >
          <svg
            onClick={dismissError}
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
            className="w-12 h-12 my-1 overflow-visible "
            style={{ background: '0 0 50 50' }}
            xmlSpace="preserve"
          >
            <circle style={{ fill: '#D75A4A', stroke: '#FFFFFF', strokeWidth: 4 }} cx="25" cy="25" r="25" />
            <polyline
              style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 4, strokeLinecap: 'round', strokeMiterlimit: 10 }}
              points="16,34 25,25 34,16
	"
            />
            <polyline
              style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 4, strokeLinecap: 'round', strokeMiterlimit: 10 }}
              points="16,16 25,25 34,34"
            />
          </svg>
        </div>
        <div
          className="
          card flex flex-col justify-center gap-1
          px-8
           pt-2
          text-center rounded-t-none rounded-b-none"
        >
          <p className="font-bold text-lg">Error!</p>

          {renderMessage()}
          <button
            className="rounded-lg bg-close-button-background
            text-white text-base
            flex items-center justify-center
            grow  font-bold
            my-2 h-9
            lg:max-w-[300px] self-center w-1/2
            hover:ring hover:ring-black hover:ring-2
            hover:cursor-pointer
            hover:opacity-95"
            onClick={dismissError}
          >
            Close
          </button>
        </div>
        <div className="flex justify-center">
          <small className=" p-2 block text-center font-semibold">Note: All errors are logged in the console</small>
        </div>
      </div>
    </div>
  );
};

export default Alert;
