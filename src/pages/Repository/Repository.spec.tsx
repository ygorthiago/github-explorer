import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Repository } from '.';
import { useRepositoriesHook } from '../../hooks/useRepositories';
import { mockedRepository, mockedRepositoryIssuesWithPR } from '../../mocks/RepositoryMocks';


jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
    useMatch: () => ({ pathname: 'repository/repo/test' })
  };
});

const mockedUseRepositoriesHook = useRepositoriesHook as jest.Mock;

jest.mock('../../hooks/useRepositories');

describe('Repository Page', () => {
  beforeEach(() => {
    mockedUseRepositoriesHook.mockReturnValue({
      getRepository: jest.fn(),
      getRepositoryIssues: jest.fn(),
      repository: mockedRepository,
      issues: mockedRepositoryIssuesWithPR,
      isGetRepositoryLoading: false,
      isGetRepositoryError: false,
      isGetRepositoryIssuesError: false,
      isGetRepositoryIssuesLoading: false,
    });

  });

  it('should be able to render the repository infos and issues', () => {
    const { getByTestId } = render(<Repository />);

    const repositoryInfo = getByTestId('repository-info')
    const repositoryIssues = getByTestId('repository-issues')

    expect(repositoryInfo).toBeInTheDocument()
    expect(repositoryIssues).toBeInTheDocument()
  });
});
