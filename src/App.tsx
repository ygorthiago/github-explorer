import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer/ToastContainer';
import { GithubExplorerProvider } from './contexts/useGithubExplorerContext';
import { Router } from './Router';
import GlobalStyle from './styles/global';

function App() {
  return (
    <GithubExplorerProvider>
      <Header />
      <Router />
      <GlobalStyle />
      <ToastContainer />
    </GithubExplorerProvider>
  );
}

export default App;
