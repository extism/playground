import React from 'react';
import './Button.css';

interface Props {
  title: string;
  onClick: any;
  className?: string;
}
const Button: React.FC<Props> = function ({ title, onClick }) {
  return (
    <div className="button-container   ">
      <button
        className="default-button p-4 rounded bg-extismPurple text-white text-2xl font-semibold hover:bg-teal active:bg-teal focus:outline-none focus:ring focus:ring-violet-300 hover:text-black "
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
