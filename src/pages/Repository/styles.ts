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