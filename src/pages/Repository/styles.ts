import styled from 'styled-components';
import Theme from '../../styles/Theme';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${Theme.colors.primaryDarkGray};
    transition: color 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  svg {
    margin-right: 4px;
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 50px;

  header {
    display: flex;
    align-items: center;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  div {
    margin-left: 24px;

    a {
      font-size: 1.5rem;
      max-width: 200px;
      color: ${Theme.colors.primaryDarkGray};
      font-weight: bold;
      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        text-decoration: underline;
        opacity: 0.9;
      }
    }

    p {
      font-size: 1.125rem;
      color: ${Theme.colors.primaryGray};
      margin-top: 4px;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin-top: 40px;
    gap: 10px 80px;
  }

  li {
    width: 100px;
    
    strong {
      display: block;
      font-size: 2.25rem;
      color: ${Theme.colors.primaryDarkGray};
    }

    span {
      display: block;
      margin-top: 4px;
      color: ${Theme.colors.primaryGray};
    }
  }

  @media(min-width: 450px) {
    img {
      width: 120px;
      height: 120px;
    }

    div {
      a {
        font-size: 2.25rem;
      }
    }
  }
`;

export const Issues = styled.div`
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
