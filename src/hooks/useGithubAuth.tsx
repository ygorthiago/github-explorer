import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import api from '../services/api';
import { app } from '../services/firebaseConfig';
import { useToastContext } from '../contexts/useToastContext';

interface IAuthUserData {
  accessToken: string;
  username: string;
}

interface IGithubAuthHook {
  authUserData: IAuthUserData;
  githubSignIn: () => void;
  githubSignOut: () => void;
}

export function useGithubAuth(): IGithubAuthHook {
  const [authUserData, setAuthUserData] = useState<IAuthUserData>(() => {
    const accessToken = localStorage.getItem('@GithubExplorer:accessToken');
    const username = localStorage.getItem('@GithubExplorer:username');

    if (accessToken && username) {
      api.defaults.headers.common.Authorization = `token ${accessToken}`;

      return { accessToken, username };
    }

    return {} as IAuthUserData;
  });

  const navigate = useNavigate();
  const { addToast } = useToastContext();

  const initializeFirebaseApp = useCallback(() => {
    app();

    const githubProvider = new GithubAuthProvider();
    githubProvider.addScope('repo');
    const auth = getAuth();

    return {
      auth,
      githubProvider,
    };
  }, []);

  const githubSignIn = useCallback(async () => {
    try {
      const { auth, githubProvider } = initializeFirebaseApp();

      const response = await signInWithPopup(auth, githubProvider);

      const credential = GithubAuthProvider.credentialFromResult(response);

      const accessToken = credential?.accessToken;
      const { displayName } = response.user;

      if (accessToken && displayName) {
        api.defaults.headers.common.Authorization = `token ${credential.accessToken}`;
        localStorage.setItem('@GithubExplorer:accessToken', accessToken);
        localStorage.setItem('@GithubExplorer:username', displayName);

        setAuthUserData({ accessToken, username: displayName });

        addToast({
          title: 'Signed in',
          description: 'Now you can search your private repos!',
        });
      }
    } catch (err) {
      console.error(err);

      addToast({
        title: 'Error',
        description: 'Some error occurred. Please, try again.',
      });
    }
  }, [addToast, initializeFirebaseApp]);

  const githubSignOut = useCallback(
    async (feedbackMessage?: string) => {
      try {
        const { auth } = initializeFirebaseApp();

        await signOut(auth);

        localStorage.removeItem('@GithubExplorer:accessToken');
        localStorage.removeItem('@GithubExplorer:username');

        setAuthUserData({} as IAuthUserData);
        api.defaults.headers.common.Authorization = '';
        navigate('/');

        addToast({
          title: 'Signed out',
          description: feedbackMessage,
        });
      } catch (err) {
        console.error(err);

        addToast({
          title: 'Error',
          description: 'Some error occurred. Please, try again.',
        });
      }
    },
    [addToast, initializeFirebaseApp, navigate],
  );

  useEffect(() => {
    api.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if ((error as Error).message.includes('401')) {
          githubSignOut('Your token expired. Please, sign in again.');
          return error;
        }

        return Promise.reject(error);
      },
    );
  }, [githubSignOut]);

  return {
    authUserData,
    githubSignIn,
    githubSignOut,
  };
}
