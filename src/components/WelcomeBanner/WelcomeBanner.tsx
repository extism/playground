import React from 'react';
import './WelcomeBanner.css';

const WelcomeBanner: React.FC = function () {
  return (
    <div className="font-sans p-8 my-10 bg-banner-background shadow border border-primary-accent border-solid rounded   font-normal">
      <p className="text-xl text-left  mr-auto  w-11/12  max-w-full  font-normal ">
        <b className="font-bold">Welcome to the Extism Playground! </b>
        Run your Extism plugins in the browser and test with various inputs to verify outputs.
      </p>
      <div className="flex ">
        <ol className="list-none text-left gap-4 flex flex-col justify-center ">
          <div className="flex items-center gap-4">
            <span className="bg-secondary-accent rounded-full w-8 h-8 text-center flex flex-col justify-center px-3 font-bold">
              1
            </span>
            <li>
              Load your module via URL or by clicking <b>Upload Module</b>
            </li>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-secondary-accent rounded-full w-8 h-8 text-center flex flex-col justify-center px-3 font-bold">
              2
            </span>
            <li>
              Choose what kind of input to provide (text, file, etc.), then choose the output type and pick a function
              exported from your module
            </li>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-secondary-accent rounded-full w-8 h-8 text-center flex flex-col justify-center px-3 font-bold">
              3
            </span>
            <li>
              Hit <b>Run Plugin</b> to see its output
            </li>
          </div>
        </ol>
      </div>
    </div>
  );
};

export default WelcomeBanner;
