import ExtismContext from '@extism/runtime-browser';
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
      const plugin = await extismContext.current.newPlugin(pluginState.url);
      const functions = await plugin.getExportedFunctions();
      setPluginState((prevState) => {
        return { ...prevState, functions: functions, func_name: functions[0] };
      });
    } catch (error) {
      console.log('ERROR IN LOAD', error);
    }
  };

  const onInputKeyPress = (e: Event) => {
    //@ts-ignore
    if (e.keyCode === 13 && e.shiftKey === true) {
      e.preventDefault();
      handleOnRun(e);
    }
  };

  const handleInputChange = (e: any) => {
    e.preventDefault && e.preventDefault();
    console.log(e.target.name, e.target.value);

    setPluginState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleOnRun = async (e?: any) => {
    e && e.preventDefault && e.preventDefault();

    try {
      let plugin = await extismContext.current.newPlugin(pluginState.url);
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

  return (
    <div className="App">
      <Header />
      <div className="container">
        <WelcomeBanner />

        <div className="module-upload-wrapper">
          <URLInput onChange={handleInputChange} defaultUrl={pluginState.defaultUrl} currentUrl={pluginState.url} />

          <FunctionDropDownMenu
            title="Function Name:"
            onChange={handleInputChange}
            options={funcOptions}
            value={pluginState.func_name}
          />
        </div>

        <div className="plugin-input-output-wrapper">
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

        <div>
          <Button onClick={handleOnRun} title="Run Plugin" />
        </div>
      </div>
    </div>
  );
};

export default App;
