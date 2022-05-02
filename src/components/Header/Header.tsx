import { BsGithub } from 'react-icons/bs';
import { SignInButton } from '../GithubSignInButton';
import { HeaderContainer, HeaderLogo } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderLogo>
        <BsGithub size={36}/> 
        <h2>
          github_explorer
        </h2>
      </HeaderLogo>
      <SignInButton />
    </HeaderContainer>
  )
}