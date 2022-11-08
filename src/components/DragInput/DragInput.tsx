import React from 'react';
import './DragInput.css';

interface DragInputProps {
  onDrop: () => {};
  onDragOver: () => {};
  onDragEnter: () => {};
  onDragLeave: () => {};
}
const DragInput: React.FC<DragInputProps> = ({ onDrop, onDragOver, onDragEnter, onDragLeave }) => {
  return <div className="dropZone">DragInput</div>;
};

export default DragInput;
