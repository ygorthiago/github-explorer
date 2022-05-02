import styled from 'styled-components';
import Theme from '../../../styles/Theme';

export const RepositoryInfoContainer = styled.section`
  margin-top: 50px;

  header {
    display: flex;
    align-items: center;

    div {
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
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 24px;
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

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`