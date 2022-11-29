import React from 'react';
import { DispatchFunc, ModuleData } from '../../types';
import ModuleLoader from '../Module-Loader/ModuleLoader';
import URLInput from '../URLInput/URLInput';
import Alert from '../Errors/Alert';
interface InputLoaderSwitchProps {
  dispatch: DispatchFunc;
  isError: boolean;
  errorMessage: string;
  onModuleChange: any;
  onURLChange: any;
  defaultUrl: string;
  url: string;
  moduleName: string;
  uploadType: string;
  moduleData: ModuleData;
}
const InputLoaderSwitch: React.FC<InputLoaderSwitchProps> = ({
  onModuleChange,
  onURLChange,
  defaultUrl,
  url,
  moduleName,
  uploadType,
  moduleData,
}) => {
  return (
    <div
      className="gap-2 flex flex-wrap justify-start items-end
      sm:flex-nowrap
      md:py-2 md:px-2 md:items-center
   "
    >
      {uploadType === 'module' ? (
        <ModuleLoader moduleName={moduleName ? moduleName : null} onChange={onModuleChange} />
      ) : (
        <URLInput
          onChange={onURLChange}
          defaultUrl={defaultUrl}
          url={typeof moduleData === 'string' ? moduleData : ''}
        />
      )}
    </div>
  );
};

export default InputLoaderSwitch;
