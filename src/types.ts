
type ModuleUrl = string;
type ModuleBytes = Uint8Array;
export type ModuleData = ModuleUrl | ModuleBytes;

export interface PluginState {
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
  loading: boolean;
};

export type PluginAction = {
  type: string;
  payload: any;
};

export type DispatchFunc = (action: PluginAction) => void;