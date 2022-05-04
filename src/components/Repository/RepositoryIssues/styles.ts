import styled from 'styled-components';
import Theme from '../../../styles/Theme';

export const RepositoryIssuesContainer = styled.div`
  margin-top: 40px;

  h2 {
    font-size: 1.5rem;
    color: ${Theme.colors.primaryDarkGray};
    margin-bottom: 20px;
  }

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

    div {
      flex: 1;
      margin: 0 16px;

      strong {
        font-size: 1.25rem;
        color: ${Theme.colors.primaryDarkGray};

        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-word;

        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
      }

      p {
        font-size: 1.125rem;
        color: ${Theme.colors.primaryGray};
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: ${Theme.colors.primaryLightGray};
      font-size: 36px;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`