import React from 'react';
import './Header.css';
import ExtismLogo from '../../assets/extism-logo.png';

const Header: React.FC = function () {
  return (
    <div className="header-container">
      <header className="header">
        <img src={ExtismLogo} width={40} height={40} alt="extism logo" />
        <h1 className="header-h1"> Extism Playground</h1>
      </header>
    </div>
  );
};

export default Header;
