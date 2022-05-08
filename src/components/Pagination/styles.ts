import styled from 'styled-components';
import Theme from '../../styles/Theme';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  margin-top: 50px;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

export const PaginationItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  p {
    align-self: center;
    color: ${Theme.colors.primaryLightGray};
    width: 0.5rem;
    border: none;
  }
`;
