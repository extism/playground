/* eslint-disable react-hooks/exhaustive-deps */
import { createPlugin } from '@extism/extism';
import React, { useEffect, useReducer, useRef } from 'react';
import './global.css';

//components
import DropDownMenu from './components/Buttons/DropDownMenu/DropDownMenu';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import InputLoaderSwitch from './components/Module-Config/InputLoaderSwitch';
import ModuleConfig from './components/Module-Config/ModuleConfig';
import PluginInput from './components/PluginInput/PluginInput';
import PluginOutput from './components/PluginOutput/PluginOutput';
import Alert from './components/Errors/Alert';
import { MimeTypes } from './lib/MimeTypes';
import { PluginAction, PluginState } from './types';
import RunButton from './components/Buttons/RunPlugin/RunButton';
import SelectFunctionDropDown from './components/Drop-Down/SelectFunctionDropDown';

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
    case 'ERROR_ON_DROP':
    case 'ERROR_ON_RUN':
    case 'ERROR_ON_INPUT':
    case 'ERROR_ON_LOAD':
      let { error } = action.payload;
      console.error(error);

      const defaultMessage = 'Please check your inputs and plugin configuration!';
      let message = error.message ? error.toString() : defaultMessage;
      return { ...state, isError: true, errorMessage: message };

    case 'DISMISS_ERROR':
      return { ...state, isError: false, errorMessage: '', loading: false };
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

// latest namespace (extism:host/env)
// const currentURL = 'https://modsurfer.dylibso.workers.dev/api/v1/module/93898457953d30d016f712ccf4336ce7e9971db5f7f3aff1edd252764f75d5d7.wasm';
const currentURL = 'https://modsurfer.dylibso.workers.dev/api/v1/module/cf29364cb62d3bc4de8654b187fae9cf50174634760eb995b1745650e7a38b41.wasm';

const initialState = {
  defaultUrl: 'https://modsurfer.dylibso.workers.dev/api/v1/module/cf29364cb62d3bc4de8654b187fae9cf50174634760eb995b1745650e7a38b41.wasm',
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
            func_name: pluginData[0]?.name,
          },
        });
      }
    }

    loadModule();
  }, []);

  const loadFunctions = async (manifest: any) => {
    try {
      const plugin = await createPlugin(manifest);
      const functions = await plugin.getExports();

      return functions.filter((x: WebAssembly.ModuleExportDescriptor) => !x.name?.startsWith('__') && x.name !== 'memory');
    } catch (error) {
      console.log('ERROR IN LOAD', error);
      dispatch({ type: 'ERROR_ON_LOAD', payload: { error } });
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
        moduleData = moduleData as string
        manifest = {
          wasm: [{ [((moduleData).indexOf('http') !== -1) ? 'url' : 'path']: moduleData }],
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
            func_name: pluginData[0]?.name,
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
            func_name: pluginData[0]?.name,
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
      const plugin = await createPlugin(manifest);

      dispatch({ type: 'ON_CALL', payload: { loading: true } });

      let result = await plugin.call(state.func_name, state.input);
      let output = result;

      dispatch({ type: 'ON_RUN', payload: { output, loading: false } });
    } catch (error) {
      dispatch({ type: 'ERROR_ON_RUN', payload: { error } });
    }
  };

  const mimeOptions = MimeTypes.map((m, i) => <option key={i}>{m}</option>);

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
          id="CONFIG-INPUT-CONTAINER"
          className="border-2 border-solid p-2
          lg:grid"
        >
          <ModuleConfig dispatch={dispatch} uploadType={state.uploadType} />
          <InputLoaderSwitch
            dispatch={dispatch}
            isError={state.isError}
            errorMessage={state.errorMessage}
            onModuleChange={handleFileInputChange}
            onURLChange={handleInputURLChange}
            defaultUrl={state.defaultUrl}
            url={state.url}
            moduleName={state.moduleName}
            uploadType={state.uploadType}
            moduleData={state.moduleData}
          />
        </div>
        <div
          className="flex items-center gap-2  mt-3
          xl:w-[49.5%]
          "
        >
          <SelectFunctionDropDown
            handleFunctionDropDownChange={handleFunctionDropDownChange}
            func_name={state.func_name}
            functions={state.functions}
          />

          <RunButton handleOnRun={handleOnRun} />
        </div>
        {state.isError && <Alert message={state.errorMessage} dispatch={dispatch} />}
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
