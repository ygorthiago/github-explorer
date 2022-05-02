import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
`

export const HeaderLogo = styled.div`
  display: flex;
  gap: 10px;
`