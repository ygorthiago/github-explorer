import styled from 'styled-components';
import Theme from '../../../styles/Theme';

export const PaginationItemButton = styled.button<{ isCurrent: boolean }>`
  font-size: 0.75rem;
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 5px;
  border: none;

  background-color: ${props =>
    props.isCurrent
      ? Theme.colors.primaryLightGray
      : Theme.colors.primaryWhite};
  color: ${props =>
    props.isCurrent
      ? Theme.colors.primaryWhite
      : Theme.colors.primaryDarkerGray};

  &:disabled {
    cursor: default;
  }
`;
