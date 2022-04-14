import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Repository } from '.';
import { useRepositoriesHook } from '../../hooks/useRepositories';


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
      repository: {
        full_name: 'repository/test',
        html_url: 'https://github.com/owner/repository/test',
        description: 'repo description',
        stargazers_count: 10,
        forks_count: 1,
        open_issues_count: 12,
        watchers_count: 90,
        owner: {
          login: 'owner',
          avatar_url: 'https://github.com/owner/image.jpg',
        }
      },
      issues: {
        id: 1,
        title: 'Repo issue',
        html_url: 'https://github.com/owner/repository/test/issue',
        pull_request: 'https://github.com/owner/repository/pr',
        user: {
          login: 'owner',
        },
      },
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
