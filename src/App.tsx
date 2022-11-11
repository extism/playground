import { ExtismContext } from '@extism/runtime-browser';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import './global.css';

//components
import Button from './components/Buttons/DefaultButton/Button';
import FunctionDropDownMenu from './components/Buttons/DropDownMenu/FunctionDropDownMenu';
import Header from './components/Header/Header';
import InputTextArea from './components/PluginInput/InputTextArea';
import PluginOutput from './components/PluginOutput/PluginOutput';
import URLInput from './components/URLInput/URLInput';
import WelcomeBanner from './components/WelcomeBanner/WelcomeBanner';

interface PluginState {
  defaultUrl: string;
  url: string;
  input: Uint8Array;
  output: Uint8Array;
  inputMimeType: string;
  outputMimeType: string;
  func_name: string;
  functions: string[];
}

const App: React.FC = () => {
  /*
      invert url: http://localhost:3000/invert.wasm
      html types

  */

  const [pluginState, setPluginState] = useState<PluginState>({
    defaultUrl: 'https://raw.githubusercontent.com/extism/extism/main/wasm/code.wasm',
    url: 'https://raw.githubusercontent.com/extism/extism/main/wasm/code.wasm',
    input: new Uint8Array(),
    output: new Uint8Array(),
    inputMimeType: 'text/plain',
    outputMimeType: 'text/plain',
    func_name: 'count_vowels',
    functions: [],
  });

  useEffect(() => {
    loadFunctions(pluginState.url);
  }, [pluginState.url]);

  const extismContext = useRef(new ExtismContext());

  const loadFunctions = async (url: string) => {
    try {
      const plugin = await extismContext.current.newPlugin({
        wasm: [{ path: pluginState.url }],
      });
      const functions = await plugin.getExportedFunctions();
      setPluginState((prevState) => {
        return { ...prevState, functions: functions, func_name: functions[0] };
      });
    } catch (error) {
      console.log('ERROR IN LOAD', error);
    }
  };

  const onInputKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode === 13 && e.metaKey) {
      e.preventDefault();
      handleOnRun(e);
    }
  };

  const handleInputChange = (e: any) => {
    e.preventDefault && e.preventDefault();

    setPluginState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleOnRun = async (e?: any) => {
    e && e.preventDefault && e.preventDefault();

    try {
      let plugin = await extismContext.current.newPlugin({
        wasm: [{ path: pluginState.url }],
      });
      let result = await plugin.call(pluginState.func_name, pluginState.input);
      let output = result;

      setPluginState((prevState) => {
        return { ...prevState, output: output };
      });
    } catch (error) {
      console.log('Error in handleOnRun:', error);
    }
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    if (files && files.length === 1) {
      let file = files[0];

      file.arrayBuffer().then((b: Iterable<number>) => {
        setPluginState((prevState) => {
          return { ...prevState, input: new Uint8Array(b) };
        });
        handleOnRun();
      });
    } else {
      throw Error('Only one file please');
    }
  };

  const funcOptions = pluginState.functions.map((f, i) => {
    return (
      <option className="" key={i} value={f}>
        {f}
      </option>
    );
  });

  return (
    <div className="App">
      <Header />
      <div className="md:container md:mx-auto">
        <WelcomeBanner />

        {
          // new module uploader//
        }

        <div className="md:container md:mx-auto  border border-black">
          <div className="flex  flex-wrap p-5 items-center justify-start gap-4 border border-black text-xl text-black font-bold text-2xl">
            <input type="file" id="selected_file" className="hidden" />
            <input
              type="button"
              value="Upload Module ▼"
              className="border-none rounded  basis-1/12  py-2 px-4 hover:cursor-pointer  bg-button-background hover:bg-secondary-dark hover:border-secondary-dark  hover:border "
              onClick={() => {
                //@ts-ignore
                document.getElementById('selected_file').click();
              }}
            />
            <div className="basis-full flex-col flex justify-start  items-start">
              <label htmlFor="url_text_input" className=" pb-1 px-4  ">
                Module Url:
              </label>
              <input
                type="text"
                className=" border  rounded font-normal  text-lg mx-4 w-full py-3 px-4
              text-lg font-sans  font-normal"
                placeholder={pluginState.defaultUrl}
                value={pluginState.url}
                onChange={handleInputChange}
                name="url"
              />
            </div>
            <FunctionDropDownMenu
              title="Function Name:"
              onChange={handleInputChange}
              options={funcOptions}
              value={pluginState.func_name}
            />
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-4 h-160 max-h-screen columns-2 border-solid p-5 my-10 border-black border-2 ">
          <InputTextArea
            handleDrop={handleDrop}
            onChange={handleInputChange}
            label="Plugin Input"
            dropDownTitle="Input Type"
            input={pluginState.input}
            mimeType={pluginState.inputMimeType}
            onKeyDown={onInputKeyPress}
          />

          <PluginOutput
            input={pluginState.input}
            output={pluginState.output}
            onChange={handleInputChange}
            mimeType={pluginState.outputMimeType}
          />
        </div>

        <div className="">
          <Button onClick={handleOnRun} title="Run Plugin" />
        </div>
      </div>
    </div>
  );
};

export default App;
