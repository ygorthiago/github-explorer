import { ReactNode } from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Repository } from '.';
import { useRepositoriesHook } from '../../hooks/useRepositories';
import {
  mockedRepository,
  mockedRepositoryIssuesWithPR,
} from '../../mocks/RepositoryMocks';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
    useMatch: () => ({ pathname: 'repository/repo/test' }),
  };
});

const mockedUseRepositoriesHook = useRepositoriesHook as jest.Mock;

jest.mock('../../hooks/useRepositories');

describe('Repository Page', () => {
  const useRepositoriesMockValues = {
    getRepository: jest.fn(),
    getRepositoryIssues: jest.fn(),
    getRepositoryReadme: jest.fn(),
    repository: mockedRepository,
    issues: mockedRepositoryIssuesWithPR,
    readme: 'mocked readme',
    isGetRepositoryLoading: false,
    isGetRepositoryError: false,
    isGetReadmeLoading: false,
    isGetReadmeError: false,
    isGetRepositoryIssuesError: false,
    isGetRepositoryIssuesLoading: false,
  };

  beforeEach(() => {
    mockedUseRepositoriesHook.mockReturnValue({
      ...useRepositoriesMockValues,
    });
  });

  it('should be able to render the repository infos, readme and issues', () => {
    const { getByTestId } = render(<Repository />);

    const repositoryInfo = getByTestId('repository-info');
    const repositoryReadme = getByTestId('repository-readme');
    const repositoryIssues = getByTestId('repository-issues');

    expect(repositoryInfo).toBeInTheDocument();
    expect(repositoryReadme).toBeInTheDocument();
    expect(repositoryIssues).toBeInTheDocument();
  });

  it('should be able to retry if some error occurs on getRepository request', () => {
    const mockedGetRepositoryInfo = jest.fn();
    mockedUseRepositoriesHook.mockReturnValue({
      ...useRepositoriesMockValues,
      getRepository: mockedGetRepositoryInfo,
      repository: null,
      isGetRepositoryError: true,
    });

    const { getByTestId } = render(<Repository />);

    const repositoryInfoErroRetryButton = getByTestId('retry-button');

    fireEvent.click(repositoryInfoErroRetryButton);

    expect(mockedGetRepositoryInfo).toHaveBeenCalled();
  });

  it('should be able to retry if some error occurs on getRepositoryReadme request', () => {
    const mockedGetRepositoryReadme = jest.fn();

    mockedUseRepositoriesHook.mockReturnValue({
      ...useRepositoriesMockValues,
      getRepositoryReadme: mockedGetRepositoryReadme,
      readme: '',
      isGetReadmeError: true,
    });

    const { getByTestId } = render(<Repository />);

    const repositoryReadmeErroRetryButton = getByTestId('retry-button');

    fireEvent.click(repositoryReadmeErroRetryButton);

    expect(mockedGetRepositoryReadme).toHaveBeenCalled();
  });

  it('should be able to retry if some error occurs on getRepository request', () => {
    const mockedGetRepositoryIssues = jest.fn();

    mockedUseRepositoriesHook.mockReturnValue({
      ...useRepositoriesMockValues,
      getRepositoryIssues: mockedGetRepositoryIssues,
      issues: [],
      isGetRepositoryIssuesError: true,
    });

    const { getByTestId } = render(<Repository />);

    const repositoryIssuesErroRetryButton = getByTestId('retry-button');

    fireEvent.click(repositoryIssuesErroRetryButton);

    expect(mockedGetRepositoryIssues).toHaveBeenCalled();
  });
});
