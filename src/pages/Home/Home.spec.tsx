import { ReactNode } from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Home } from '.';
import { useGithubExplorerContext } from '../../contexts/useGithubExplorerContext';

const mockedAddToast = jest.fn();
const mockedGetRepositoryRequest = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock('../../hooks/useToast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    })
  }
});

const mockedUseGithubExplorerContext = useGithubExplorerContext as jest.Mock;

jest.mock('../../contexts/useGithubExplorerContext');

describe('Home Page', () => {
  beforeEach(() => {
    mockedUseGithubExplorerContext.mockReturnValue({
      getRepositoryRequest: mockedGetRepositoryRequest,
    });
  });

  it('should be able to search a repository', () => {
    const { getByTestId } = render(<Home />);

    const searchRepositoryInput = getByTestId('search-repository-input')
    const searchRepositoryButton = getByTestId('search-repository-button')

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test' } });
    fireEvent.click(searchRepositoryButton)

    expect(mockedGetRepositoryRequest).toHaveBeenCalled()
  });

  it('should be able to search a repository without clicking on search button', async () => {
    const { getByTestId } = render(<Home />);
    
    const searchRepositoryInput = getByTestId('search-repository-input')

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test' } });
    
    setTimeout(() => {
      expect(mockedGetRepositoryRequest).toHaveBeenCalled()
    }, 1201);
  });

  it('should not be able to search a repository without filling the search input', () => {
    const { getByTestId } = render(<Home />);
    const searchRepositoryButton = getByTestId('search-repository-button')

    fireEvent.click(searchRepositoryButton)

    const searchErrorMessage = getByTestId('search-repository-error')

    expect(searchErrorMessage).toHaveTextContent('Enter the author/repository name')
  });

  it('should display an error if search fails', () => {
    mockedGetRepositoryRequest.mockImplementation(() => {
      throw new Error();
    })

    const { getByTestId } = render(<Home />);

    const searchRepositoryInput = getByTestId('search-repository-input')
    const searchRepositoryButton = getByTestId('search-repository-button')

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test' } });
    fireEvent.click(searchRepositoryButton)

    const searchErrorMessage = getByTestId('search-repository-error')

    expect(searchErrorMessage).toHaveTextContent('Error searching repository')
  });

  it('should display an error if repository was not found', () => {
    mockedGetRepositoryRequest.mockImplementation(() => {
      throw new Error('404 - Repository not found')
    })

    const { getByTestId } = render(<Home />);

    const searchRepositoryInput = getByTestId('search-repository-input')
    const searchRepositoryButton = getByTestId('search-repository-button')

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test' } });
    fireEvent.click(searchRepositoryButton)

    const searchErrorMessage = getByTestId('search-repository-error')

    expect(searchErrorMessage).toHaveTextContent('Repository not found')
  });
});
