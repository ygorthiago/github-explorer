import styled from 'styled-components'
import Theme from '../../styles/Theme'

export const ErrorRetryContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    background: ${Theme.colors.primaryDarkerGray};
    color: ${Theme.colors.primaryWhite};
    border: 0;
    border-radius: 4px;
    padding: 0.625rem;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`

export const ErrorText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 1rem;
  
  p {
    color: ${Theme.colors.primaryMediumGray} !important; 
    text-align: center;

    margin-top: 0.5rem;
  }
`