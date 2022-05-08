import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ToastContainer } from '../components/ToastContainer';
import { IToastHook, useToastHook } from '../hooks/useToast';

interface IToastProviderProps {
  children: ReactNode;
}

type IToastContextData = IToastHook;

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

export function ToastProvider({ children }: IToastProviderProps): JSX.Element {
  const useToast = useToastHook();

  const contextValue = useMemo(() => {
    return { ...useToast };
  }, [useToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToastContext(): IToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within an ToastProvider');
  }

  return context;
}
