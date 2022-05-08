import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Theme from '../../../styles/Theme';

export const RepositoryCardContainer = styled(Link)`
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  div {
    flex: 1;
    margin: 0 16px;

    strong {
      font-size: 1.25rem;
      color: ${Theme.colors.primaryDarkGray};
    }

    p {
      font-size: 1.125;
      color: ${Theme.colors.primaryGray};
      margin-top: 4px;
    }
  }

  svg {
    margin-left: auto;
    color: ${Theme.colors.primaryLightGray};
  }

  @media (min-width: 450px) {
    img {
      width: 64px;
      height: 64px;
    }
  }
`;
