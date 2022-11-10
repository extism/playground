import React from 'react';
import './Button.css';

interface Props {
  title: string;
  onClick: any;
}
const Button: React.FC<Props> = function ({ title, onClick }) {
  return (
    <div className="button-container">
      <button className="default-button" onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
