import styled from "styled-components";
import Theme from "../../styles/Theme";

export const GithubAuthButton = styled.button `
  height: 3rem;
  border-radius: 3rem;
  background: ${Theme.colors.primaryDarkerGray};
  border: 0;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${Theme.colors.primaryWhite};
  font-weight: bold;

  svg {
    width: 20px;
    height: 20px;

    &:first-child {
      margin-right: 1rem;
    }

    &.signedInIcon {
      color: ${Theme.colors.primaryGreen}
    }

    &.closeIcon {
      margin-left: 1rem;
      color: ${Theme.colors.primaryGray}
    }
  }

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`