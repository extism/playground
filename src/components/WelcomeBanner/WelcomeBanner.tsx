import React from 'react';
import './WelcomeBanner.css';

const WelcomeText: string =
  'Run your Extism plugins in the browser and test with various inputs to verify outputs. Load your module via URL or by clicking "Upload Module", then choose what kind of input to provide (text, file, etc). Once your input is configured, chose the output type, pick a function exported from your module, and hit "Run Plugin" to see its ouput';
const WelcomeBanner: React.FC = function () {
  return (
    <div className="font-sans m-auto p-5 my-10 bg-banner-background shadow border border-primary-accent border-solid rounded text-lg font-normal">
      <p className="lg:h-64 text-xl font-normal ">
        <b className="font-bold">Welcome to the Extism Playground! </b>
        {WelcomeText}
      </p>
      <ol className="list-decimal">
        <li>Load your module via URL or by clicking Upload Module</li>
        <li></li>
        <li></li>
      </ol>
    </div>
  );
};

export default WelcomeBanner;
