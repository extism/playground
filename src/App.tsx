/* eslint-disable react-hooks/exhaustive-deps */
import { ExtismContext } from '@extism/runtime-browser';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import './global.css';

//components
import Button from './components/Buttons/DefaultButton/Button';
import Header from './components/Header/Header';
import InputTextArea from './components/PluginInput/InputTextArea';
import PluginOutput from './components/PluginOutput/PluginOutput';
import WelcomeBanner from './components/WelcomeBanner/WelcomeBanner';
import ModuleLoader from './components/Module-Loader/ModuleLoader';
import URLInput from './components/URLInput/URLInput';
import Footer from './components/Footer/Footer';
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
  uploadType: string;
  moduleName: string;
}
type PluginAction = {
  type: string;
  payload: any;
};

const pluginReducer = (state: PluginState, action: PluginAction) => {
  switch (action.type) {
    case 'INIT':
      return { ...state, ...action.payload };
    case 'UPLOAD_TYPE':
      return { ...state, uploadType: action.payload };
    case 'URL_INPUT':
      return { ...state, ...action.payload };
    case 'MODULE_INPUT':
      return { ...state, ...action.payload };
    case 'FUNCTION_DROPDOWN':
      return { ...state, ...action.payload };
    case 'FILE_DROP':
      return { ...state, ...action.payload };
    case 'ON_RUN':
      return { ...state, ...action.payload };
    case 'INPUT_CHANGE':
      return { ...state, ...action.payload };
    case 'OUTPUT_MIME_TYPE':
      return { ...state, ...action.payload };
    case 'INPUT_MIME_TYPE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
/*
      invert url: http://localhost:3000/invert.wasm
https://raw.githubusercontent.com/extism/extism-fsnotify/main/apps/md2html/md2html.wasm
https://githubusercontent.com/extism/playground/main/public/invert.wasm
  */
// for testing purposes only.
const currentURL = 'https://raw.githubusercontent.com/extism/extism-fsnotify/main/apps/md2html/md2html.wasm';
const getPluginURLName = (url: string) => {
  const indexOfLastForwardSlash = url.lastIndexOf('/');
  const pluginName = url.slice(indexOfLastForwardSlash + 1);
  return pluginName;
};

const initialState = {
  defaultUrl: 'https://raw.githubusercontent.com/extism/extism/main/wasm/code.wasm',
  moduleData: currentURL,
  input: new Uint8Array(),
  output: new Uint8Array(),
  inputMimeType: 'text/plain',
  outputMimeType: 'text/plain',
  func_name: 'should_handle_file',
  functions: [],
  uploadType: 'url',
  moduleName: getPluginURLName(currentURL),
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(pluginReducer, initialState);

  useEffect(() => {
    async function loadModule() {
      const manifest = getManifest(state.moduleData);
      const pluginData = await loadFunctions(manifest);
      if (pluginData) {
        dispatch({
          type: 'INIT',
          payload: {
            functions: pluginData,
            func_name: pluginData[0],
          },
        });
      }
    }
    loadModule();
  }, []);

  const extismContext = useRef(new ExtismContext());

  const loadFunctions = async (manifest: any) => {
    try {
      const plugin = await extismContext.current.newPlugin(manifest);
      const functions = await plugin.getExportedFunctions();
      return functions;
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

  const handleFunctionDropDownChange = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'FUNCTION_DROPDOWN', payload: { func_name: e.target.value } });
  };
  const getManifest = (moduleData: string | Uint8Array) => {
    let manifest: any;
    switch (moduleData.constructor) {
      case String:
        manifest = {
          wasm: [{ path: moduleData as string }],
        };
        break;

      case Uint8Array:
        manifest = {
          wasm: [{ data: moduleData as Uint8Array }],
        };
        break;
    }
    return manifest;
  };
  const handleInputURLChange = async (e: any) => {
    const pluginName = getPluginURLName(e.target.value);

    try {
      let manifest = getManifest(e.target.value);
      let pluginData = await loadFunctions(manifest);
      console.log(manifest, ' in handl');

      if (pluginData) {
        dispatch({
          type: 'URL_INPUT',
          payload: {
            moduleData: e.target.value,
            functions: pluginData,
            func_name: pluginData[0],
            moduleName: pluginName,
          },
        });
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const handleFileInputChange = async (fileData: { moduleData: Uint8Array; moduleName: string }) => {
    const { moduleData, moduleName } = fileData;

    try {
      let manifest = getManifest(moduleData);
      let pluginData = await loadFunctions(manifest);
      if (pluginData) {
        dispatch({
          type: 'MODULE_INPUT',
          payload: {
            moduleData,
            functions: pluginData,
            func_name: pluginData[0],
            moduleName,
          },
        });
      }
    } catch (error) {
      console.log('error getting file', error);
    }
  };

  const handleInputChange = (inputData: { input: Uint8Array }) => {
    const { input } = inputData;
    dispatch({ type: 'INPUT_CHANGE', payload: { input } });
  };

  const handleOnRun = async (e?: any) => {
    e && e.preventDefault && e.preventDefault();

    try {
      const manifest = getManifest(state.moduleData);
      const plugin = await extismContext.current.newPlugin(manifest);

      let result = await plugin.call(state.func_name, state.input);
      let output = result;

      dispatch({ type: 'ON_RUN', payload: { output } });
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
        dispatch({ type: 'FILE_DROP', payload: { input: new Uint8Array(b) } });
      });
      handleOnRun();
    } else {
      throw Error('Only one file please');
    }
  };

  const funcOptions = state.functions.map((f: string, i: number) => {
    return (
      <option key={i} value={f}>
        {f}
      </option>
    );
  });

  return (
    <div className="App">
      <Header />
      <div className=" px-4  md:p-4 md:container mx-auto  ">
        <WelcomeBanner />
        <div className="form flex  ">
          <form className="border  border-solid border-black hover:border-primary-accent">
            <fieldset className="flex flex-col p-4">
              <legend>How would you like to load your module?</legend>
              <div className="flex gap-2">
                <label className="basis-3/12 flex" htmlFor="use_url">
                  Url
                </label>
                <div className="flex">
                  <input
                    className="w-4 h-4"
                    onChange={() => {
                      dispatch({ type: 'UPLOAD_TYPE', payload: 'url' });
                    }}
                    value="url"
                    type="radio"
                    defaultChecked
                    name="uploadType"
                    id="use_url"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <label className="basis-3/12 flex" htmlFor="use_module">
                  Module
                </label>
                <div className="flex">
                  <input
                    className="w-4 h-4"
                    value="module"
                    onChange={() => {
                      dispatch({ type: 'UPLOAD_TYPE', payload: 'module' });
                    }}
                    type="radio"
                    name="uploadType"
                    id="use_module"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="md:flex py-4 px-2 gap-2  items-center ">
          {state.uploadType === 'module' ? (
            <ModuleLoader onChange={handleFileInputChange} />
          ) : (
            <URLInput
              onChange={handleInputURLChange}
              defaultUrl={state.defaultUrl}
              url={typeof state.moduleData === 'string' ? state.moduleData : ''}
            />
          )}
        </div>
        <div className="flex p-2 flex-col md:gap-4 items-start border border-black borer-solid">
          <div>
            <p>
              Plugin Name: <span className="font-semibold text-primary-accent">{state.moduleName}</span>
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <span>Functions:</span>
            <p className="flex gap-4">
              {state.functions.map((func: string, i: number) => {
                const isSelected = func === state.func_name;

                let className;
                if (isSelected) {
                  className =
                    '  saturate-200 scale-95 transition  duration-200 font-bold  border border-solid border-primary-accent shadow-inner shadow-gray-400 text-green   ';
                } else {
                  className = '0 transition shadow-slate-900 shadow border-l-2  border-b-2 ';
                }
                return (
                  <button
                    key={i}
                    className={className + ' rounded p-[3px]'}
                    onClick={() => dispatch({ type: 'FUNCTION_DROPDOWN', payload: { func_name: func } })}
                  >
                    <span className="text-inherit shadow-inherit ">{func}</span>
                  </button>
                );
              })}
            </p>
          </div>
        </div>
        <div className="flex my-10 bg-blue/40 outline backdrop-brightness-75  box-shadow-2xl ">
          <p className="font-medium flex gap-2 ">
            Selected Function: <span className="font-mono text-string-red">{state.func_name}</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 h-160 max-h-screen columns-2 border-solid p-5 my-10 border-black border-2 ">
          <InputTextArea
            handleDrop={handleDrop}
            dispatch={dispatch}
            onChange={handleInputChange}
            label="Plugin Input"
            dropDownTitle="Input Type"
            input={state.input}
            mimeType={state.inputMimeType}
            onKeyDown={onInputKeyPress}
          />

          <PluginOutput input={state.input} output={state.output} dispatch={dispatch} mimeType={state.outputMimeType} />
        </div>

        <div className="">
          <Button onClick={handleOnRun} title="Run Plugin" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
