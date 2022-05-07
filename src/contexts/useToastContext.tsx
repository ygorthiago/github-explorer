import { createContext, ReactNode, useContext } from 'react';
import { IToastHook, useToastHook } from '../hooks/useToast';

interface IToastProviderProps {
  children: ReactNode;
}

interface IToastContextData extends IToastHook { }

const ToastContext = createContext<IToastContextData>({} as IToastContextData);
export function ToastProvider({ 
  children 
}: IToastProviderProps): JSX.Element {
  const useToast = useToastHook();

  return (
    <ToastContext.Provider
      value={{
        ...useToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext(): IToastContextData {
  const context = useContext(ToastContext);

  return context;
}
