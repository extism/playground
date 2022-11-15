import React, { useRef, useState } from 'react';
import './WelcomeBanner.css';

const WelcomeBanner: React.FC = function () {
  const collapsibleDiv = useRef<HTMLDivElement>(null);
  const [menuText, setMenuText] = useState('+');
  const toggleCollapsible = (event: React.MouseEvent<HTMLButtonElement>) => {
    var content = collapsibleDiv.current as HTMLDivElement;
    console.log(content.style.maxHeight, 'here');

    if (content.style.maxHeight) {
      //@ts-ignore
      content.style.maxHeight = null;
      setMenuText('+');
    } else {
      content.style.maxHeight = content.scrollHeight + 50 + 'px';
      setMenuText('-');
    }
  };
  return (
    <div className="justify-end flex mt-2 mb-10">
      <button
        className="rounded border border-primary-accent border-solid  relative lg:min-w-[300px] flex  flex-col mb-10 "
        onClick={toggleCollapsible}
      >
        <p className=" bg-banner-background rounded p-2 font-bold flex w-full justify-between">
          Help
          <span className="bg-black flex flex-col justify-center font-bold text-center text-white rounded-full w-5 h-5">
            {menuText}
          </span>
        </p>

        <div
          ref={collapsibleDiv}
          className="max-h-0  bg-help-background border z-50 border-primary-accent border-solid  absolute top-10 rounded overflow-hidden ease-out duration-300"
        >
          <div className="font-sans p-4    top rounded max-w-prose tracking-tighter   font-normal">
            <div className="px-4">
              <h1 className="font-bold text-left text-lg">Welcome to the Extism Playground! </h1>
            </div>
            <div className="flex py-4 pl-4 ">
              <ol className="list-none text-left gap-4 flex flex-col justify-center ">
                <div className="flex  items-center gap-4">
                  <span className="bg-secondary-accent rounded-full w-8 h-8 text-center flex flex-col justify-center px-3 font-bold">
                    1
                  </span>
                  <li>
                    Load your module via URL or by clicking <b>Upload Module</b>
                  </li>
                </div>
                <div className="flex items-center  gap-4">
                  <span className="bg-secondary-accent rounded-full w-8 h-8 text-center flex flex-col justify-center px-3 font-bold">
                    2
                  </span>
                  <li>
                    Choose what kind of input to provide (text, file, etc.), then choose the output type and pick a
                    function exported from your module
                  </li>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-secondary-accent rounded-full w-8 h-8 text-center flex flex-col justify-center px-3 font-bold">
                    3
                  </span>
                  <li>
                    Hit <b>Run Plugin</b> to see its output
                  </li>
                </div>
              </ol>
            </div>
          </div>
        </div>
      </button>
    </div>
    // <div className="font-sans p-4 my-4  bg-banner-background shadow border border-primary-accent border-solid rounded   font-normal">
    //   <p className="text-xl text-left  mr-auto  w-11/12  max-w-full  font-normal ">
    //     <b className="font-bold">Welcome to the Extism Playground! </b>
    //     Run your Extism plugins in the browser and test with various inputs to verify outputs.
    //   </p>
    //   <div className="flex py-2 ">
    //     <ol className="list-none text-left gap-4 flex flex-col justify-center ">
    //       <div className="flex  items-center gap-4">
    //         <span className="bg-secondary-accent rounded-full w-8 h-8 text-center flex flex-col justify-center px-3 font-bold">
    //           1
    //         </span>
    //         <li>
    //           Load your module via URL or by clicking <b>Upload Module</b>
    //         </li>
    //       </div>
    //       <div className="flex items-center  gap-4">
    //         <span className="bg-secondary-accent rounded-full w-8 h-8 text-center flex flex-col justify-center px-3 font-bold">
    //           2
    //         </span>
    //         <li>
    //           Choose what kind of input to provide (text, file, etc.), then choose the output type and pick a function
    //           exported from your module
    //         </li>
    //       </div>
    //       <div className="flex items-center gap-4">
    //         <span className="bg-secondary-accent rounded-full w-8 h-8 text-center flex flex-col justify-center px-3 font-bold">
    //           3
    //         </span>
    //         <li>
    //           Hit <b>Run Plugin</b> to see its output
    //         </li>
    //       </div>
    //     </ol>
    //   </div>
    // </div>
  );
};

export default WelcomeBanner;
