import { ExtismContext } from '@extism/runtime-browser';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import './global.css';

//components
import Button from './components/Buttons/DefaultButton/Button';
import Header from './components/Header/Header';
import InputTextArea from './components/PluginInput/InputTextArea';
import PluginOutput from './components/PluginOutput/PluginOutput';
import WelcomeBanner from './components/WelcomeBanner/WelcomeBanner';
import ModuleLoader from './components/Module-Loader/ModuleLoader';

type ModuleUrl = string;
type ModuleBytes = Uint8Array;

type ModuleData = ModuleUrl | ModuleBytes;
interface PluginState {
  defaultUrl: string;
  moduleData: ModuleData;

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

  */

  const [pluginState, setPluginState] = useState<PluginState>({
    defaultUrl: 'https://raw.githubusercontent.com/extism/extism/main/wasm/code.wasm',
    moduleData: 'https://raw.githubusercontent.com/extism/extism/main/wasm/code.wasm',
    input: new Uint8Array(),
    output: new Uint8Array(),
    inputMimeType: 'text/plain',
    outputMimeType: 'text/plain',
    func_name: 'count_vowels',
    functions: [],
  });

  useEffect(() => {
    loadFunctions();
  }, [pluginState.moduleData]);

  const extismContext = useRef(new ExtismContext());

  const getManifest = () => {
    let manifest: any;
    switch (pluginState.moduleData.constructor) {
      case String:
        manifest = {
          wasm: [{ path: pluginState.moduleData as string }],
        };
        break;

      case Uint8Array:
        manifest = {
          wasm: [{ data: pluginState.moduleData as Uint8Array }],
        };
        break;
    }
    return manifest;
  };
  const loadFunctions = async () => {
    try {
      let manifest = getManifest();
      const plugin = await extismContext.current.newPlugin(manifest);
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
    if (e.preventDefault) {
      e.preventDefault();

      setPluginState((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    } else {
      setPluginState((prevState) => {
        return { ...prevState, [e.name]: e.value };
      });
    }
  };

  const handleOnRun = async (e?: any) => {
    e && e.preventDefault && e.preventDefault();

    try {
      const manifest = getManifest();
      const plugin = await extismContext.current.newPlugin(manifest);

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
      <option key={i} value={f}>
        {f}
      </option>
    );
  });

  // check pluginState.moduleData
  let inputValue;
  if (typeof pluginState.moduleData === 'string') {
    inputValue = pluginState.moduleData;
  } else {
    inputValue = '';
  }
  return (
    <div className="App">
      <Header />
      <div className="md:container md:mx-auto">
        <WelcomeBanner />
        <div className="md:flex py-4 px-2 gap-2  items-center ">
          <ModuleLoader onChange={handleInputChange} />
          <div className="py-2 basis-10/12 items-center flex">
            <b className="basis-2/12">Module URL:</b>
            <input
              className="basis-10/12 h-11 p-3 text-lg  text-mid-gray bg-background-lightest  hover:border-primary-accent"
              type="text"
              placeholder={pluginState.defaultUrl}
              value={inputValue}
              onChange={handleInputChange}
              name="moduleData"
            />
          </div>
          <div className="basis-5/12  flex">
            <div className="basis-full flex  items-center justify-end  ">
              <label
                className=" basis-3/4  h-11 flex gap-1 items-center  text-left  text-md text-mid-gray bg-background-lightest basis-4/6 rounded  p-3 "
                htmlFor="func_name"
              >
                Function Name: <span className="font-mono text-string-red">{pluginState.func_name}</span>
              </label>

              <select
                autoComplete="off"
                required
                name="func_name"
                id="func_name"
                value={pluginState.func_name}
                onChange={handleInputChange}
                className=" pt-10  bg-fit bg-dark-blue-button min-w-1/6 basis-1/6 bg-no-repeat bg-center  bg-[url('/src/assets/chevron-right.png')] basis-1/12 h-11 w-8 rounded relative appearance-none "
              >
                {funcOptions}
              </select>
            </div>
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
