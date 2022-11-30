import React from 'react';
interface RunButtonProps {
  handleOnRun: React.MouseEventHandler<HTMLButtonElement>;
}
const RunButton: React.FC<RunButtonProps> = ({ handleOnRun }) => {
  return (
    <div
      className="
  flex grow basis-full
  lg:basis-1/12
  xl:basis-0
  xl:justify-end
  "
    >
      <button
        className="p-2 rounded grow basis-full text-white
    bg-extismPurple
    font-semibold
    lg:text-xl lg:font-bold lg:p-3

    xl:w-[268px]
    xl:basis-[unset]
    xl:p-4   xl:grow-0
    hover:ring hover:ring-black hover:ring-2
    hover:opacity-95
    "
        onClick={handleOnRun}
        title="Run Plugin"
      >
        Run Plugin
      </button>
    </div>
  );
};

export default RunButton;
