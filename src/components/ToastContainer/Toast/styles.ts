import styled from 'styled-components';
import { animated } from 'react-spring';
import Theme from '../../../styles/Theme';

export const StyledToast = styled(animated.div)`
  width: 18rem;

  position: relative;
  padding: 1rem 1.8rem 1rem 1rem;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${Theme.colors.primaryGray};
  color: ${Theme.colors.primaryWhite};

  > svg {
    margin-right: 1.25rem;
  }

  & + div {
    margin-top: 8px;
  }

  div {
    display: flex;
    flex-direction: column;
    width: 10rem;

    strong {
      color: ${Theme.colors.primaryWhite};
    }

    .date {
      margin-top: 5px;
      font-size: 0.8rem;
      opacity: 0.7;
    }
  }

  button {
    position: absolute;
    right: 1rem;
    top: 1.25rem;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;

    svg {
      color: var(--white);
      margin-left: 0.75rem;
    }
  }
`;