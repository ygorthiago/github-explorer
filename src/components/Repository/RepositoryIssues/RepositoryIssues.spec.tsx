import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RepositoryIssues } from '.';
import { mockedRepositoryIssues, mockedRepositoryIssuesWithPR } from '../../../mocks/RepositoryMocks';
import { useRepositoriesHook } from '../../../hooks/useRepositories';

const repositoryIssuesProps = {
  repositoryName: 'repository/name',
  totalIssues: 20,
}

const mockedUseRepositoriesHook = useRepositoriesHook as jest.Mock;

jest.mock('../../../hooks/useRepositories');

describe('RepositoryIssues component', () => {
  const useRepositoriesMockValues = {
    getRepositoryIssues: jest.fn(),
    issues: [mockedRepositoryIssuesWithPR, mockedRepositoryIssues],
    isGetRepositoryIssuesError: false,
    isGetRepositoryIssuesLoading: false,
  }

  beforeEach(() => {
    mockedUseRepositoriesHook.mockReturnValue({
      ...useRepositoriesMockValues,
    });
  });

  it('should be able to render the repository issues and pull requests', () => {
    const { getByTestId } = render(<RepositoryIssues {...repositoryIssuesProps} />);

    const repositoryInfo = getByTestId('repository-issues')

    expect(repositoryInfo).toBeInTheDocument()
  });

  it('should not render the repository issues if the repositoryIssues is empty', () => {
    mockedUseRepositoriesHook.mockReturnValue({
      ...useRepositoriesMockValues,
      issues: []
    })

    const { getByTestId } = render(<RepositoryIssues {...repositoryIssuesProps} />);

    const repositoryInfo = getByTestId('repository-issues')

    expect(repositoryInfo).toBeInTheDocument()
  });

  it('should be able to render the Loader component if isLoading is true', () => {
    mockedUseRepositoriesHook.mockReturnValue({
      ...useRepositoriesMockValues,
      isGetRepositoryIssuesLoading: true,
    })

    const { getByTestId } = render(<RepositoryIssues {...repositoryIssuesProps} />);

    const loaderComponent = getByTestId('repository-issues-loader')

    expect(loaderComponent).toBeInTheDocument()
  });

  it('should be able to render the ErrorRetry component if isError is true', () => {
    mockedUseRepositoriesHook.mockReturnValue({
      ...useRepositoriesMockValues,
      isGetRepositoryIssuesError: true,
    })

    const { getByTestId } = render(<RepositoryIssues {...repositoryIssuesProps} />);

    const errorRetryButton = getByTestId('repository-issues-error')

    expect(errorRetryButton).toBeInTheDocument()
  });
});
