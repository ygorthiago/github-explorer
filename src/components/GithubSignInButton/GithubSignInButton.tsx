import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useGithubAuth } from '../../hooks/useGithubAuth';
import { GithubAuthButton } from './styles';

export function SignInButton() {
  const { githubSignIn, githubSignOut, authUserData } = useGithubAuth();

  return authUserData.accessToken ? (
    <GithubAuthButton
      type="button"
      onClick={() => githubSignOut()}
      data-testid="sign-out-button"
    >
      <FaGithub className="signedInIcon" />
      {authUserData.username}
      <FiX className="closeIcon" />
    </GithubAuthButton>
  ) : (
    <GithubAuthButton
      type="button"
      onClick={() => githubSignIn()}
      data-testid="sign-in-button"
    >
      <FaGithub />
      Sign in with Github
    </GithubAuthButton>
  );
}
