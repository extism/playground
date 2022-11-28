/* eslint-disable react-hooks/exhaustive-deps */
import { ExtismContext } from '@extism/runtime-browser';
import React, { useEffect, useReducer, useRef } from 'react';
import './global.css';

//components
import DropDownMenu from './components/Buttons/DropDownMenu/DropDownMenu';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ModuleLoader from './components/Module-Loader/ModuleLoader';
import PluginInput from './components/PluginInput/PluginInput';
import PluginOutput from './components/PluginOutput/PluginOutput';
import URLInput from './components/URLInput/URLInput';
import { MimeTypes } from './lib/MimeTypes';
import { PluginState, PluginAction } from './types';

const pluginReducer = (state: PluginState, action: PluginAction) => {
  switch (action.type) {
    case 'INIT':
    case 'URL_INPUT':
    case 'MODULE_INPUT':
    case 'FUNCTION_DROPDOWN':
    case 'FILE_DROP':
    case 'ON_RUN':
    case 'ON_CALL':
    case 'INPUT_CHANGE':
    case 'OUTPUT_CHANGE':
    case 'OUTPUT_MIME_TYPE':
    case 'INPUT_MIME_TYPE':
      return { ...state, ...action.payload };
    case 'UPLOAD_TYPE':
      return { ...state, uploadType: action.payload };
    case 'ERROR_ON_RUN':
      let { error } = action.payload;
      return state;
    case 'ERROR_ON_INPUT':
      error = action.payload;
      console.log('ERROR_DISPATCH', error);

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
  func_name: 'count_vowels',
  functions: [],
  uploadType: 'url',
  moduleName: false,
  isError: false,
  errorMessage: '',
  loading: false,
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
      const functions = await plugin.getExports();
      return Object.keys(functions).filter((x) => !x.startsWith('__') && x !== 'memory');
    } catch (error) {
      console.log('ERROR IN LOAD', error);
    }
  };

  const handleFunctionDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  const handleInputURLChange = async (e: React.FocusEvent<HTMLInputElement> | string) => {
    const manifestData = typeof e === 'string' ? e : e.target.value;
    try {
      let manifest = getManifest(manifestData);
      let pluginData = await loadFunctions(manifest);

      if (pluginData) {
        dispatch({
          type: 'URL_INPUT',
          payload: {
            moduleData: manifestData,
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

  const handleOnRun = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e && e.preventDefault();

    try {
      const manifest = getManifest(state.moduleData);
      const plugin = await extismContext.current.newPlugin(manifest);

      dispatch({ type: 'ON_CALL', payload: { loading: true } });

      let result = await plugin.call(state.func_name, state.input);
      let output = result;

      dispatch({ type: 'ON_RUN', payload: { output, loading: false } });
    } catch (error) {
      // dispatch({ type: 'ERROR_ON_RUN', payload: { error } });
      console.log('ERROR IN RUN', error);
    }
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
      className="h-[100vh] flex flex-col"
      onDragOver={(e: React.DragEvent) => {
        e.preventDefault();
      }}
    >
      <Header />
      <div
        onDragOver={(e: React.DragEvent) => {
          e.preventDefault();
        }}
        className="px-4  md:p-4 md:container md:mx-auto flex-[1_0_auto]  "
      >
        <div
          className="CONFIG___  border-2 border-solid p-2
          lg:grid
        "
        >
          <div className=" LOADMODULEFROM__ md:flex  my-2 px-4  md:gap-2 font-bold  md:items-center ">
            <label className="w-[200px] text-sm  font-semibold md:text-base md:font-bold md:text-lg lg:w-[20%] xl:max-w-[175px]">
              Load Module From:
            </label>
            <form className="text-sm md:flex basis-10/12 md:items-center md:gap-2">
              <input
                className="form-radio"
                onChange={() => {
                  dispatch({ type: 'UPLOAD_TYPE', payload: 'url' });
                }}
                value="url"
                type="radio"
                defaultChecked
                name="uploadType"
                id="use_url"
              />
              <label className="text-sm md:text-lg" htmlFor="use_url">
                URL
              </label>
              <input
                className="form-radio"
                value="module"
                onChange={() => {
                  dispatch({ type: 'UPLOAD_TYPE', payload: 'module' });
                }}
                type="radio"
                name="uploadType"
                id="use_module"
              />

              <label className="text-sm md:min-w-[5rem] md:text-lg" htmlFor="use_module">
                Local File
              </label>
            </form>
          </div>

          <div
            className="gap-2 flex flex-wrap justify-start items-end sm:flex-nowrap
             md:py-2 md:px-2 md:items-center"
          >
            {state.uploadType === 'module' ? (
              <ModuleLoader moduleName={state.moduleName ? state.moduleName : null} onChange={handleFileInputChange} />
            ) : (
              <URLInput
                onChange={handleInputURLChange}
                defaultUrl={state.defaultUrl}
                url={typeof state.moduleData === 'string' ? state.moduleData : ''}
              />
            )}
          </div>
          <div
            className="flex grow
          sm:basis-1/2
          md:items-center"
          ></div>
        </div>
        <div
          className="flex items-center gap-2  mt-3
        xl:w-[49.5%]
        "
        >
          <div
            className="flex
            basis-1/4
            xl:basis-3/4
          "
          >
            <label
              className=" items-center rounded text-left  text-sm text-black bg-background-lightest
              font-semibold h-11
              px-3
              md:p-3
              basis-1/2 md:h-11 md:flex gap-1
              xl:h-[62px]
              xl:text-base
"
              htmlFor="func_name"
            >
              Function Name:
            </label>

            <select
              autoComplete="off"
              required
              name="func_name"
              id="func_name"
              value={state.func_name}
              onChange={handleFunctionDropDownChange}
              className="hover:cursor-pointer
              basis-1/2
              lg:text-base
              xl:text-lg
              "
            >
              {funcOptions}
            </select>
          </div>
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
        </div>
        <div
          className=" flex flex-col
        border-solid mt-4
        lg:gap-x-4  lg:gap-y-2 lg:grid
        lg:grid-rows-[1fr_auto] lg:grid-cols-2
        "
        >
          <div className="flex flex-col basis-6/12">
            <div className="flex  md:gap-4 lg:gap-6">
              <label
                className="text-white bg-black pt-3 md:min-h-[40px] md:mt-auto lg:font-bold  px-4 rounded-t-lg"
                htmlFor="plugin-input-textarea"
              >
                Plugin input:
              </label>
              <DropDownMenu
                mimeType={state.inputMimeType}
                selectName="inputMimeType"
                title={'Input Type'}
                options={mimeOptions}
                onChange={(e: React.ChangeEvent) => {
                  const element = e.target as HTMLSelectElement;
                  const inputMimeType = element.value;
                  dispatch({ type: 'INPUT_MIME_TYPE', payload: { inputMimeType } });
                }}
              />
            </div>
            <PluginInput dispatch={dispatch} input={state.input} mimeType={state.inputMimeType} />
          </div>
          {/* <div
            className="flex w-full mx-auto
          lg:w-1/3 lg:row-start-2 lg:self-start lg:justify-self-end lg:m-0

          "
          >
            <button
              className="p-2 rounded  text-white grow mb-12
              bg-extismPurple
              lg:text-xl lg:font-bold lg:p-3
              xl:p-5
              hover:ring hover:ring-black hover:ring-2
              hover:opacity-95
              "
              onClick={handleOnRun}
              title="Run Plugin"
            >
              Run Plugin
            </button>
          </div> */}
          <div className="flex flex-col basis-6/12 ">
            <div className="flex basis-1/12   justify-between  md:gap-4 lg:gap-6">
              <label
                className="text-white bg-black pt-2   md:min-h-[40px] md:mt-auto lg:font-bold   px-4 rounded-t-lg"
                htmlFor="plugin-output-textarea"
              >
                Plugin Output:
              </label>
              <DropDownMenu
                mimeType={state.outputMimeType}
                selectName="outputMimeType"
                title="Output Type"
                options={mimeOptions}
                onChange={(e: React.ChangeEvent) => {
                  const element = e.target as HTMLSelectElement;
                  const outputMimeType = element.value;
                  dispatch({ type: 'OUTPUT_MIME_TYPE', payload: { outputMimeType } });
                }}
              />
            </div>
            <PluginOutput
              //@ts-ignore
              loading={state.loading}
              input={state.input}
              output={state.output}
              dispatch={dispatch}
              mimeType={state.outputMimeType}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
