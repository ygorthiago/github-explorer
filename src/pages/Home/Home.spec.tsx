import { ReactNode } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Home } from '.';
import { useGithubExplorerContext } from '../../contexts/useGithubExplorerContext';
import { mockedRepository } from '../../mocks/RepositoryMocks';

const mockedAddToast = jest.fn();
const mockedGetRepositoryRequest = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

const initialStoragedData = [
  mockedRepository
];

const mockedUseGithubExplorerContext = useGithubExplorerContext as jest.Mock;

jest.mock('../../contexts/useGithubExplorerContext');
jest.useFakeTimers();

describe('Home Page', () => {
  beforeEach(() => {
    mockedUseGithubExplorerContext.mockReturnValue({
      getRepositoryRequest: mockedGetRepositoryRequest,
      addToast: mockedAddToast,
    });

    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it('should be able to initialize repository list with localStorage values', () => {
    const { getByTestId } = render(<Home />);

    const repositoryList = getByTestId('repository-list')

    expect(repositoryList).toBeTruthy();
  });

  it('should be able to search a repository', () => {
    const { getByTestId } = render(<Home />);

    const searchRepositoryInput = getByTestId('search-repository-input')
    const searchRepositoryButton = getByTestId('search-repository-button')

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test-search' } });
    fireEvent.click(searchRepositoryButton)

    expect(mockedGetRepositoryRequest).toHaveBeenCalled()
  });

  it('should be able to search a repository that is already in the list', () => {
    const { getByTestId, getByText } = render(<Home />);

    const searchRepositoryInput = getByTestId('search-repository-input')
    const searchRepositoryButton = getByTestId('search-repository-button')

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test' } });
    fireEvent.click(searchRepositoryButton)

    const repository = getByText('repository/test')

    expect(repository).toBeInTheDocument()  
  });

  it('should be able to search a repository without clicking on search button', async () => {
    const { getByTestId } = render(<Home />);
    
    const searchRepositoryInput = getByTestId('search-repository-input')

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test-search' } });

    jest.runAllTimers();
    
    expect(mockedGetRepositoryRequest).toHaveBeenCalled()
  });

  it('should not do the auto search if the search input is empty', async () => {
    const { getByTestId } = render(<Home />);
    
    const searchRepositoryInput = getByTestId('search-repository-input')

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test-search' } });
    fireEvent.change(searchRepositoryInput, { target: { value: '' } });

    jest.runAllTimers();
    
    expect(mockedGetRepositoryRequest).not.toHaveBeenCalled()
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

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test-fails' } });
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

    fireEvent.change(searchRepositoryInput, { target: { value: 'repository/test-not-found' } });
    fireEvent.click(searchRepositoryButton)

    const searchErrorMessage = getByTestId('search-repository-error')

    expect(searchErrorMessage).toHaveTextContent('Repository not found')
  });

  it('should be able to clear repositories list', async () => {
    const { getByTestId, queryByTestId } = render(<Home />);

    const clearRepositoryListButton = getByTestId('clear-repository-list-button')
    const repositoryListBefore = getByTestId('repository-list')

    expect(repositoryListBefore).toBeTruthy()

    fireEvent.click(clearRepositoryListButton)

    const repositoryListAfter = queryByTestId('repository-list')

    await waitFor(() => {
      expect(repositoryListAfter).not.toBeTruthy()
    })
  });
});
