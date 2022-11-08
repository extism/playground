import React from 'react';
import './WelcomeBanner.css';

const WelcomeText: string =
  'Welcome to the Extism Playground! Run your Extism plugins in the browser and test with various inputs to verify outputs. Load your module via URL or by clicking "Upload Module", then choose what kind of input to provide (text, file, etc). Once your input is configured, chose the output type, pick a function exported from your module, and hit "Run Plugin" to see its ouput';
const WelcomeBanner: React.FC = function () {
  return <div className="welcome-container">{WelcomeText}</div>;
};

export default WelcomeBanner;
