import React from 'react';
import './Header.css';

const Header: React.FC = function () {
  return (
    <div className="h-20 flex items-center justify-start bg-black">
      <header className="flex gap-4 items-center mx-12 ">
        <img src="https://extism.org/img/logo.svg" className="" width={50} height={50} alt="extism logo" />
        <h1
          className=" header-1 tracking-tight  text-3xl font-bold
        leading-snug text-white"
        >
          Extism Playground
        </h1>
      </header>
    </div>
  );
};

export default Header;
