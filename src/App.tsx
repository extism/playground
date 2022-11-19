/* eslint-disable react-hooks/exhaustive-deps */
import { ExtismContext } from '@extism/runtime-browser';
import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';
import './global.css';

//components
import DropDownMenu from './components/Buttons/DropDownMenu/DropDownMenu';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ModuleLoader from './components/Module-Loader/ModuleLoader';
import PluginInput from './components/PluginInput/PluginInput';
import PluginOutput from './components/PluginOutput/PluginOutput';
import URLInput from './components/URLInput/URLInput';
import { MimeTypes } from './util/MimeTypes';
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
  moduleName: boolean | string;
  isError: boolean;
  errorMessage: string;
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
    case 'OUTPUT_CHANGE':
      return { ...state, ...action.payload };
    case 'OUTPUT_MIME_TYPE':
      return { ...state, ...action.payload };
    case 'INPUT_MIME_TYPE':
      return { ...state, ...action.payload };
    case 'ERROR_ON_RUN':
      let { error } = action.payload;
      return state;
    case 'ERROR_ON_INPUT':
      error = action.payload;
      console.log('ERRORDSPAATCH', error);

      return state;
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
const currentURL = 'https://raw.githubusercontent.com/extism/extism/main/wasm/code.wasm';
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
  moduleName: false,
  isError: false,
  errorMessage: '',
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

      if (pluginData) {
        dispatch({
          type: 'URL_INPUT',
          payload: {
            moduleData: e.target.value,
            functions: pluginData,
            func_name: pluginData[0],
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
      // dispatch({ type: 'ERROR_ON_RUN', payload: { error } });
      console.log('ERROR IN RUN', error);
    }
  };
  const handleDrop = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    if (files && files.length === 1) {
      let file = files[0];

      file.arrayBuffer().then((b: Iterable<number>) => {
        dispatch({ type: 'FILE_DROP', payload: { input: new Uint8Array(b) } });
      });
    } else {
      throw Error('Only one file please');
    }

    handleOnRun();
  };
  const mimeOptions = MimeTypes.map((m, i) => <option key={i}>{m}</option>);
  const funcOptions = state.functions.map((f: string, i: number) => {
    return (
      <option key={i} value={f}>
        {f}
      </option>
    );
  });

  return (
    <div
      className="h-[100vh] sm:flex flex-col"
      onDragOver={(e: React.DragEvent) => {
        e.preventDefault();
      }}
    >
      <Header />
      <div
        onDragOver={(e: React.DragEvent) => {
          e.preventDefault();
        }}
        className="px-4  md:p-4 md:container mx-auto flex-[1_0_auto]  "
        // className=" px-4  md:p-4 md:container mx-auto  "
      >
        <div className="md:flex  my-2 px-2  md:gap-2 font-bold md:items-center">
          <label className="w-[200px] text-sm  font-semibold md:text-base md:font-bold md:text-lg lg:w-2/12  ">
            Load Module From:
          </label>
          <form className=" text-sm md:flex basis-10/12 md:items-center md:gap-4 ">
            <div className="sm:flex basis-1/12 gap-2">
              <input
                className=""
                onChange={() => {
                  dispatch({ type: 'UPLOAD_TYPE', payload: 'url' });
                }}
                value="url"
                type="radio"
                defaultChecked
                name="uploadType"
                id="use_url"
              />
              <label htmlFor="use_url">URL</label>
            </div>
            <div className="flex basis-1/12 gap-2">
              <input
                className=""
                value="module"
                onChange={() => {
                  dispatch({ type: 'UPLOAD_TYPE', payload: 'module' });
                }}
                type="radio"
                name="uploadType"
                id="use_module"
              />

              <label className="" htmlFor="use_module">
                Local File
              </label>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap  md:flex-nowrap md:my-4 md:py-2 md:px-2 gap-2  items-center ">
          {state.uploadType === 'module' ? (
            <ModuleLoader moduleName={state.moduleName ? state.moduleName : null} onChange={handleFileInputChange} />
          ) : (
            <URLInput
              onChange={handleInputURLChange}
              defaultUrl={state.defaultUrl}
              url={typeof state.moduleData === 'string' ? state.moduleData : ''}
            />
          )}
          <div className="flex">
            <div className="flex py-2  justify-between md:items-center md:justify-end  ">
              <label
                className="flex items-center text-sm text-mid-gray bg-background-lightest "
                // className="basis-3/4  h-11 flex gap-1 items-center text-md text-mid-gray bg-background-lightest basis-4/6 rounded  m:p-3 "
                htmlFor="func_name"
              >
                Function Name: <span className="font-mono text-string-red">{state.func_name}</span>
              </label>

              <select
                autoComplete="off"
                required
                name="func_name"
                id="func_name"
                value={state.func_name}
                onChange={handleFunctionDropDownChange}
                className=" appearance-none bg-fit bg-no-repeat bg-center pt-6 w-6 h-8  bg-[url('/src/assets/chevron-right.png')] bg-dark-blue   "
                // className=" pt-10  bg-fit bg-dark-blue min-w-1/6 basis-1/6 bg-no-repeat bg-center  bg-[url('/src/assets/chevron-right.png')] basis-1/12 h-11 w-8 rounded relative appearance-none "
              >
                {funcOptions}
              </select>
            </div>
          </div>
        </div>

        <div className=" flex flex-col lg:flex-row  max-h-screen gap-4 border-solid mt-8 ">
          <div className="flex flex-col  basis-6/12">
            <div className="flex items-center basis-1/12 md:gap-4 lg:gap-6">
              <label
                className="text-white bg-black pt-3 md:min-h-[40px] md:mt-auto lg:font-bold  px-4 rounded-t-lg"
                htmlFor="plugin-input-textarea"
              >
                Plugin input:
              </label>
              <DropDownMenu
                mimeType={state.inputMimeType}
                selectName="inputMimeType"
                title={'Input'}
                options={mimeOptions}
                onChange={(e: React.ChangeEvent) => {
                  const element = e.target as HTMLSelectElement;
                  const inputMimeType = element.value;
                  dispatch({ type: 'INPUT_MIME_TYPE', payload: { inputMimeType } });
                }}
              />
            </div>
            <PluginInput
              handleDrop={handleDrop}
              dispatch={dispatch}
              onChange={handleInputChange}
              label="Plugin Input"
              dropDownTitle="Input Type"
              input={state.input}
              mimeType={state.inputMimeType}
              onKeyDown={onInputKeyPress}
              handleOnRun={handleOnRun}
            />
          </div>
          <div className="flex flex-col basis-6/12 ">
            <div className="flex basis-1/12 items-center   justify-between  md:gap-4 lg:gap-6">
              <label
                className="text-white bg-black pt-2   md:min-h-[40px] md:mt-auto lg:font-bold   px-4 rounded-t-lg"
                htmlFor="plugin-output-textarea"
              >
                Plugin Output:
              </label>
              <DropDownMenu
                mimeType={state.outputMimeType}
                selectName="outputMimeType"
                title="Output"
                options={mimeOptions}
                onChange={(e: React.ChangeEvent) => {
                  const element = e.target as HTMLSelectElement;
                  const outputMimeType = element.value;
                  dispatch({ type: 'OUTPUT_MIME_TYPE', payload: { outputMimeType } });
                }}
              />
            </div>
            <PluginOutput
              input={state.input}
              output={state.output}
              dispatch={dispatch}
              mimeType={state.outputMimeType}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 w-1/2 justify-end ">
          <button
            className=" basis-2/12 p-4 rounded bg-extismPurple text-white lg:text-xl font-semibold hover:bg-teal active:bg-teal focus:outline-none focus:ring focus:ring-violet-300 hover:text-black "
            onClick={handleOnRun}
            title="Run Plugin"
          >
            Run Plugin
          </button>
          <div></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

/**
 *
 *
 *
 *
 *
 *  <div className="flex basis-[12.333%] p-3 flex items-center justify-end ">
              <button
                className=" p-4 rounded bg-extismPurple text-white text-2xl font-semibold hover:bg-teal active:bg-teal focus:outline-none focus:ring focus:ring-violet-300 hover:text-black "
                onClick={handleOnRun}
                title="Run Plugin"
              >
                Run Plugin
              </button>
            </div>

                      <div className="basis-full flex basis-[12.333%] p-3 flex items-center justify-end "></div>
 */
