import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RepositoryInfo } from '.';

const repositoryInfoProps = {
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
  isLoading: false,
  isError: false,
  retryFunction: jest.fn(),
}

describe('RepositoryInfo component', () => {
  it('should be able to render the repository infos', () => {
    const { getByTestId } = render(<RepositoryInfo {...repositoryInfoProps} />);

    const repositoryInfo = getByTestId('repository-info')

    expect(repositoryInfo).toBeInTheDocument()
  });

  it('should not render the repository infos if the repository prop is null', () => {
    const newRepoInfoProps = {
      ...repositoryInfoProps,
      repository: null
    }
    const { getByTestId } = render(<RepositoryInfo {...newRepoInfoProps} />);

    const repositoryInfo = getByTestId('repository-info')

    expect(repositoryInfo).toBeInTheDocument()
  });

  it('should be able to render the Loader component if isLoading is true', () => {
    const newRepoInfoProps = {
      ...repositoryInfoProps,
      isLoading: true,
    }
    const { getByTestId } = render(<RepositoryInfo {...newRepoInfoProps} />);

    const loaderComponent = getByTestId('repository-info-loader')

    expect(loaderComponent).toBeInTheDocument()
  });

  it('should be able to render the ErrorRetry component if isError is true', () => {
    const newRepoInfoProps = {
      ...repositoryInfoProps,
      isError: true,
    }
    const { getByTestId } = render(<RepositoryInfo {...newRepoInfoProps} />);

    const errorRetryButton = getByTestId('repository-info-error')

    expect(errorRetryButton).toBeInTheDocument()
  });
});
