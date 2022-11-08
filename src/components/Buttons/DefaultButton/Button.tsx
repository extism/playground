import React from 'react';
import './Button.css';

interface Props {
  title: string;
}
const Button: React.FC<Props> = function ({ title }) {
  return (
    <div className="button-container">
      <button className="default-button" onClick={() => {}}>
        {title}
      </button>
    </div>
  );
};

export default Button;
