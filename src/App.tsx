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

//@ts-no-check
const App: React.FC = () => {
  // input ouput to UInt8Array type
  /*
  write two funcs, different functions for each mime type
    encode

    decode

    - as args : (bytes, mimeType)

    State- output select menu needs mime types

    -- for now text/plain  png/image jpg/image


    for images
      if input type is image,

        either drag in image
        or filetree menu chooser.

      display image when its loaded
  */
  const [pluginState, setPluginState] = useState({
    url: 'https://raw.githubusercontent.com/extism/extism/main/wasm/code.wasm',
    input: '',
    output: '',
    func_name: 'count_vowels',
    functions: [],
  });

  const extismContext = useRef(new ExtismContext());

  const loadFunctions = async (url: string) => {
    console.log('url', url);

    const plugin = await extismContext.current.newPlugin(pluginState.url);
    console.log('plugin', plugin);

    const functions = await plugin.getExportedFunctions();
    console.log('functions', functions);

    setPluginState((prevState) => {
      return { ...prevState, functions: functions };
    });
  };

  useEffect(() => {
    loadFunctions(pluginState.url);
  }, [pluginState.url]);

  const handleInputChange = (e: Event) => {
    e.preventDefault();
    //@ts-ignore
    console.log('e', e.target.name);
    //@ts-ignore
    setPluginState((prevState) => {
      //@ts-ignore
      return { ...prevState, [e.target.name]: e.target.value };
    });

    //@ts-ignore
    // if (e.target.name === 'url') {
    //   //@ts-ignore
    //   loadFunctions(e.target.value);
    // }
  };

  const handleOnRun = async (e: Event) => {
    e && e.preventDefault && e.preventDefault();
    console.log('INPUT', pluginState.input);

    let plugin = await extismContext.current.newPlugin(pluginState.url);
    let result = await plugin.call(pluginState.func_name, pluginState.input);
    let output = new TextDecoder().decode(result);
    console.log('result', output);

    setPluginState({ ...pluginState, output: output });
  };

  // drag and drop functions
  // const nop = (e: Event) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  // const handleDrop = (e: Event) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   //@ts-ignore
  //   let files = [...e.dataTransfer.files];
  //   if (files && files.length === 1) {
  //     let file = files[0];
  //     console.log(file);
  //     getBase64(file, (b64) => {
  //       // we need to remove the content type part of the string
  //       if (typeof b64 === 'string') {
  //         b64 = b64?.substring(b64?.indexOf(',') + 1);
  //         let input = JSON.stringify({
  //           event_file_name: file.name,
  //           event_file_data: b64,
  //         });
  //         setPluginState({ ...pluginState, input });
  //         handleOnRun(e);
  //       }
  //     });
  //   } else {
  //     throw Error('Only one file please');
  //   }
  // };

  // const getBase64 = (file: File, cb: (b64: string | ArrayBuffer | null) => void) => {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     cb(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     console.log('error');
  //   };
  // };

  const funcOptions = pluginState.functions.map((f, i) => (
    <option selected={i === 0 ? true : false} key={i} value={f}>
      {f}
    </option>
  ));

  // if (pluginState.output) {
  //   try {
  //     let result = JSON.parse(pluginState.output);

  //     let image = null;

  //     if (result.output_file_data) {
  //       image = <img src={`data:image/png;base64,${result.output_file_data}`} alt="" />;
  //     } else {
  //       console.log('No output_file_data, moving on');
  //     }
  //   } catch (e) {
  //     console.log('Could not parse output json, moving on');
  //   }
  // }
  return (
    <div className="App">
      <Header />
      <div className="container">
        <WelcomeBanner />

        <div className="module-upload-wrapper">
          <URLInput onChange={handleInputChange} currentUrl={pluginState.url} />
          <Button onClick={() => {}} title="Upload Module" />
          <FunctionDropDownMenu
            title="Function Name:"
            onChange={handleInputChange}
            options={funcOptions}
            value={pluginState.func_name}
          />
        </div>

        <div className="plugin-input-output-wrapper">
          <InputTextArea
            onChange={handleInputChange}
            label="Plugin Input"
            dropDownTitle="Input Type"
            input={pluginState.input}
          />

          <PluginOutput
            output={pluginState.output}
            label="Plugin Output"
            dropDownTitle="Output Type"
            onChange={handleInputChange}
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
