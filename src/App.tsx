import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './contexts/useToastContext';
import { Router } from './Router';
import GlobalStyle from './styles/global';

import { Header } from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Header />
        <Router />
        <GlobalStyle />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
