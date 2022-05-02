import { useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import { RepositoryInfo } from '../../components/Repository/RepositoryInfo';
import { RepositoryIssues } from '../../components/Repository/RepositoryIssues';

import { useRepositoriesHook } from '../../hooks/useRepositories';
import { RepositoryReadme } from '../../components/Repository/RepositoryReadme';

import { Header } from './styles';

export function Repository() {
  const {
    getRepository,
    getRepositoryIssues,
    repository,
    issues,
    isGetRepositoryLoading,
    isGetRepositoryError,
    isGetRepositoryIssuesError,
    isGetRepositoryIssuesLoading,
    getRepositoryReadme,
    readme,
    isGetReadmeLoading,
    isGetReadmeError
  } = useRepositoriesHook()

  const match = useMatch('/repository/:repository*');

  const repositoryName = match?.pathname.replace('/repository/', '')!;

  useEffect(() => {
    if (repositoryName) {
      getRepository(repositoryName)
    }
  }, [repositoryName]);

  useEffect(() => {
    if (repositoryName && repository) {
      getRepositoryReadme(repositoryName)
    }

    if (repositoryName && repository?.open_issues_count) {
      getRepositoryIssues(repositoryName)
    }
  }, [repositoryName, repository, repository?.open_issues_count]);

  return (
    <>
      <Header>
        <Link to="/" data-testid='back-button'>
          <FiChevronLeft size={16} />
          Go back
        </Link>
      </Header>

      <RepositoryInfo
        repository={repository}
        isLoading={isGetRepositoryLoading}
        isError={isGetRepositoryError}
        retryFunction={() => getRepository(repositoryName)}
      />

      {repository && (
        <RepositoryReadme
          readme={readme}
          isLoading={isGetReadmeLoading}
          isError={isGetReadmeError}
          retryFunction={() => getRepositoryReadme(repositoryName)}
        />
      )}

      {repository && !isGetReadmeLoading && (
        <RepositoryIssues
          repositoryIssues={issues}
          isLoading={isGetRepositoryIssuesLoading}
          isError={isGetRepositoryIssuesError}
          retryFunction={() => getRepositoryIssues(repositoryName)}
        />
      )}
    </>
  );
};