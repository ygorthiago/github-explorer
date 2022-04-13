import styled from 'styled-components'

export const ToastContainer = styled.div`
  position: fixed;
  right: 0;
  top: 4rem;
  padding: 0 0.625rem;
  overflow: hidden;
  z-index: 1000;

  @media (min-width: 700px) {
    padding: 0 1.875rem;
    right: calc((100vw - 700px) / 2);
  }
`