import styled, { css } from 'styled-components'
import Theme from '../../styles/Theme';

interface FormProps {
  hasError: boolean;
}

export const HomeContainer = styled.main`
  
`

export const HomeTitle = styled.h1`
  font-size: 48px;
  color: ${Theme.colors.primaryDarkerGray};
  max-width: 450px;
  line-height: 56px;
  align-self: flex-start;
  margin-top: 80px;
`;

export const SearchRepoForm = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: ${Theme.colors.primaryDarkerGray};
    border: 2px solid ${Theme.colors.primaryWhite};
    border-right: 0;
    
    ${props =>
      props.hasError &&
      css`
        border-color: ${Theme.colors.primaryRed};
      `}

    &::placeholder {
      color: ${Theme.colors.primaryGray};
    }
  }

  button {
    width: 110px;
    height: 70px;
    background: ${Theme.colors.primaryGreen};
    border-radius: 0 5px 5px 0;
    border: 0;
    color: ${Theme.colors.primaryWhite};
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const SearchError = styled.span`
  display: block;
  color: ${Theme.colors.primaryRed};
  margin-top: 8px;
`;

export const Repositories = styled.section`
  margin-top: 60px;
  max-width: 700px;

  a {
    background: ${Theme.colors.primaryWhite};
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin: 0 16px;

      strong {
        font-size: 20px;
        color: ${Theme.colors.primaryDarkGray};
      }

      p {
        font-size: 18px;
        color: ${Theme.colors.primaryGray};
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: ${Theme.colors.primaryLightGray};
    }
  }
`;

export const ClearList = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  color: ${Theme.colors.primaryDarkGray};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }
`