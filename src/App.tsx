import ExtismContext from '@extism/runtime-browser';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import './global.css';
import Header from './components/Header/Header';
import ModuleUploadWrapper from './components/ModuleUploadWrapper/ModuleUploadWrapper';
import WelcomeBanner from './components/WelcomeBanner/WelcomeBanner';
import PluginInputOutputWrapper from './components/PluginInputOutputWrapper/PluginInputOutputWrapper';
import Button from './components/Buttons/DefaultButton/Button';

const App: React.FC = () => {
  const [pluginState, setPluginState] = useState({
    url: 'https://raw.githubusercontent.com/extism/extism/main/wasm/code.wasm',
    input: '',
    output: '',
    func_name: 'count_vowels',
    functions: [],
  });

  const extismContext = useRef(new ExtismContext());

  async function loadFunctions(url: string) {
    const plugin = await extismContext.current.newPlugin(pluginState.url);
    const functions = await plugin.getExportedFunctions();
    console.log('funcs ', functions);
    setPluginState({ ...pluginState, functions });
  }

  useEffect(() => {
    loadFunctions(pluginState.url);

    return () => {
      console.log('CLEANUP');
    };
  }, []);

  // const handleDrop = function (e: Event) {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   let files = [...e.dataTransfer.files];
  //   if (files && files.length == 1) {
  //     let file = files[0];
  //     console.log(file);
  //     getBase64(file, (b64) => {
  //       // we need to remove the content type part of the string
  //       b64 = b64.substring(b64.indexOf(',') + 1);
  //       let input = JSON.stringify({
  //         event_file_name: file.name,
  //         event_file_data: b64,
  //       });
  //       this.setState({ input });
  //       this.handleOnRun();
  //     });
  //   } else {
  //     throw Error('Only one file please');
  //   }
  // };
  const funcOptions = pluginState.functions.map((f) => <option value={f}>{f}</option>);
  let image = null;

  // if (this.state.output) {
  //   try {
  //     let result = JSON.parse(this.state.output);
  //     if (result.output_file_data) {
  //       image = <img src={`data:image/png;base64,${result.output_file_data}`} />;
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
      <WelcomeBanner />
      <ModuleUploadWrapper />
      <PluginInputOutputWrapper />
      <div>
        <Button title="Run Plugin" />
      </div>
    </div>
  );
};

export default App;
