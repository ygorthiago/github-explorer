import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RepositoryIssues } from '.';
import { mockedRepositoryIssues, mockedRepositoryIssuesWithPR } from '../../../mocks/RepositoryMocks';

const repositoryIssuesProps = {
  repositoryIssues: [
    mockedRepositoryIssues,
    mockedRepositoryIssuesWithPR,
  ],
  isLoading: false,
  isError: false,
  retryFunction: jest.fn(),
}

describe('RepositoryIssues component', () => {
  it('should be able to render the repository issues and pull requests', () => {
    const { getByTestId } = render(<RepositoryIssues {...repositoryIssuesProps} />);

    const repositoryInfo = getByTestId('repository-issues')

    expect(repositoryInfo).toBeInTheDocument()
  });

  it('should not render the repository issues if the repositoryIssues is empty', () => {
    const newRepoIssuesProps = {
      ...repositoryIssuesProps,
      repositoryIssues: []
    }
    const { getByTestId } = render(<RepositoryIssues {...newRepoIssuesProps} />);

    const repositoryInfo = getByTestId('repository-issues')

    expect(repositoryInfo).toBeInTheDocument()
  });

  it('should be able to render the Loader component if isLoading is true', () => {
    const newRepoIssuesProps = {
      ...repositoryIssuesProps,
      isLoading: true,
    }
    const { getByTestId } = render(<RepositoryIssues {...newRepoIssuesProps} />);

    const loaderComponent = getByTestId('repository-issues-loader')

    expect(loaderComponent).toBeInTheDocument()
  });

  it('should be able to render the ErrorRetry component if isError is true', () => {
    const newRepoIssuesProps = {
      ...repositoryIssuesProps,
      isError: true,
    }
    const { getByTestId } = render(<RepositoryIssues {...newRepoIssuesProps} />);

    const errorRetryButton = getByTestId('repository-issues-error')

    expect(errorRetryButton).toBeInTheDocument()
  });
});
