import { BsGithub } from 'react-icons/bs';
import { HeaderContainer } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <BsGithub size={36}/> 
      <h2>
        github_explorer
      </h2>
    </HeaderContainer>
  )
}