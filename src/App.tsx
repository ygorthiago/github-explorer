import { ToastContainer } from './components/ToastContainer/ToastContainer';
import { ToastProvider } from './contexts/useToastContext';
import { Router } from './Router';
import GlobalStyle from './styles/global';

import { Header } from './components/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Header />
        <Router />
        <GlobalStyle />
        <ToastContainer />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
