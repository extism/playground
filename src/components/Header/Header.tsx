import React from 'react';
import './Header.css';
import ExtismLogo from '../../assets/extism-logo.png';

const Header: React.FC = function () {
  return (
    <header className="header-container">
      <img src={ExtismLogo} width={32} height={32} alt="extism logo" />
      <h1 className="header-h1"> Extism Playground</h1>
    </header>
  );
};

export default Header;
