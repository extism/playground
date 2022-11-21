import React from 'react';

const WelcomeBanner: React.FC = () => {
  return (
    <div>
      <p className="text-xl text-left mr-auto w-11/12  max-w-full font-normal ">
        <b className="font-bold">Welcome to the Extism Playground! </b>
        Run your Extism plugins in the browser and test with various inputs to verify outputs.
      </p>
    </div>
  );
};

export default WelcomeBanner;
