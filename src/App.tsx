import { ToastContainer } from './components/ToastContainer/ToastContainer';
import { GithubExplorerProvider } from './contexts/useGithubExplorerContext';
import { Router } from './Router';
import GlobalStyle from './styles/global';

import { Header } from './components/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <GithubExplorerProvider>
        <Header />
        <Router />
        <GlobalStyle />
        <ToastContainer />
      </GithubExplorerProvider>
    </BrowserRouter>
  );
}

export default App;
