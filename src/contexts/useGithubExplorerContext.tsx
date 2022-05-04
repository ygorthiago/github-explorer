import { createContext, ReactNode, useContext } from 'react';
import { IToastHook, useToastHook } from '../hooks/useToast';

interface IGithubExplorerProviderProps {
  children: ReactNode;
}

interface IGithubExplorerContextData extends IToastHook { }

const GithubExplorerContext = createContext<IGithubExplorerContextData>({} as IGithubExplorerContextData);
export function GithubExplorerProvider({ 
  children 
}: IGithubExplorerProviderProps): JSX.Element {
  const useToast = useToastHook();

  return (
    <GithubExplorerContext.Provider
      value={{
        ...useToast,
      }}
    >
      {children}
    </GithubExplorerContext.Provider>
  );
}

export function useGithubExplorerContext(): IGithubExplorerContextData {
  const context = useContext(GithubExplorerContext);

  return context;
}
