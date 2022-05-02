import { fireEvent, render } from '@testing-library/react';
import { SignInButton } from '.';
import { useGithubAuth } from '../../hooks/useGithubAuth';

jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(),
  };
});

const mockedUseGithubAuth = useGithubAuth as jest.Mock;

jest.mock('../../hooks/useGithubAuth');

const mockedGithubSignIn = jest.fn()
const mockedGithubSignOut = jest.fn()

describe('SignInButton Component', () => {
  const useGithubAuthMockValues = {
    authUserData: {},
    githubSignIn: mockedGithubSignIn,
    githubSignOut: mockedGithubSignOut
  }

  beforeEach(() => {
    mockedUseGithubAuth.mockReturnValue({
      ...useGithubAuthMockValues,
    })
  })
  it('should be able to render SignInButton component', () => {
    const headerComponent = render(<SignInButton />);

    expect(headerComponent).toBeTruthy();
  });

  it('should be able to SignIn', () => {
    const { getByTestId } = render(<SignInButton />);

    const signInButton = getByTestId('sign-in-button')
    fireEvent.click(signInButton)

    expect(mockedGithubSignIn).toHaveBeenCalled()
  });

  it('should be able to SignOut', () => {
    mockedUseGithubAuth.mockReturnValue({
      ...useGithubAuthMockValues,
      authUserData: {
        accessToken: 'mockedAccessToken',
        username: 'mockedUsername'
      },
    })

    const { getByTestId } = render(<SignInButton />);

    const signOutButton = getByTestId('sign-out-button')
    fireEvent.click(signOutButton)

    expect(mockedGithubSignOut).toHaveBeenCalled()
  });
});
