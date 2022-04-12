import styled from 'styled-components';
import Theme from '../../styles/Theme';

export const LoaderContainer = styled.span`
  border: 4px solid ${Theme.colors.primaryWhite};
  border-radius: 50%;
  border-top: 4px solid ${Theme.colors.primaryDarkerGray};
  width: 40px;
  height: 40px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`