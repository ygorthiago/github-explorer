import styled from 'styled-components'
import Theme from '../../styles/Theme'

export const ErrorRetryContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  h3 {
    margin-bottom: 1rem;
  }

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