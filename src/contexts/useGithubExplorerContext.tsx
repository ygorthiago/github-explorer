import { createContext, ReactNode, useContext } from 'react';
import { IUseRepositoriesHook, useRepositoriesHook } from '../hooks/useRepositories';
import { IToastHook, useToastHook } from '../hooks/useToast';

interface IGithubExplorerProviderProps {
  children: ReactNode;
}

interface IGithubExplorerContextData extends IToastHook, IUseRepositoriesHook { }

const GithubExplorerContext = createContext<IGithubExplorerContextData>({} as IGithubExplorerContextData);
export function GithubExplorerProvider({ 
  children 
}: IGithubExplorerProviderProps): JSX.Element {
  const useToast = useToastHook();
  const useRepositories = useRepositoriesHook();

  return (
    <GithubExplorerContext.Provider
      value={{
        ...useToast,
        ...useRepositories,
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
