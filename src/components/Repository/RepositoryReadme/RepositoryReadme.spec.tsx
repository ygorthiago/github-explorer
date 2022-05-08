import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RepositoryReadme } from '.';

const repositoryReadmeProps = {
  readme: 'mocked repository readme',
  isLoading: false,
  isError: false,
  retryFunction: jest.fn(),
};

describe('RepositoryReadme component', () => {
  it('should be able to render the repository repo', () => {
    const { getByTestId } = render(
      <RepositoryReadme {...repositoryReadmeProps} />,
    );

    const repositoryReadme = getByTestId('repository-readme');

    expect(repositoryReadme).toBeInTheDocument();
  });

  it('should not render the repository repo if the readme prop is empty', () => {
    const newRepoReadmeProps = {
      ...repositoryReadmeProps,
      repository: '',
    };

    const { getByTestId } = render(
      <RepositoryReadme {...newRepoReadmeProps} />,
    );

    const repositoryReadme = getByTestId('repository-readme');

    expect(repositoryReadme).toBeInTheDocument();
  });

  it('should be able to render the Loader component if isLoading prop is true', () => {
    const newRepoReadmeProps = {
      ...repositoryReadmeProps,
      isLoading: true,
    };

    const { getByTestId } = render(
      <RepositoryReadme {...newRepoReadmeProps} />,
    );

    const loaderComponent = getByTestId('repository-readme-loader');

    expect(loaderComponent).toBeInTheDocument();
  });

  it('should be able to render the ErrorRetry component if isError prop is true', () => {
    const newRepoReadmeProps = {
      ...repositoryReadmeProps,
      isError: true,
    };

    const { getByTestId } = render(
      <RepositoryReadme {...newRepoReadmeProps} />,
    );

    const errorRetryButton = getByTestId('repository-readme-error');

    expect(errorRetryButton).toBeInTheDocument();
  });
});
