import { createGlobalStyle } from 'styled-components';
import Theme from './Theme';

export default createGlobalStyle`    
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  #root {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
  }

  html {
  @media(max-width: 1080px) {
    font-size: 93.75%;
  }

  @media(max-width: 720px) {
    font-size: 87.5%;
  }

  @media(max-width: 300px) {
    font-size: 67.5%;
  }
}

  body {
    background: ${Theme.colors.background};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  button {
    cursor: pointer;
  }

  *::-webkit-scrollbar {
    width: 9px;
    background: ${Theme.colors.primaryLightGray};
  }

  *::-webkit-scrollbar-thumb {
    background: ${Theme.colors.primaryGray};
  }
`;
