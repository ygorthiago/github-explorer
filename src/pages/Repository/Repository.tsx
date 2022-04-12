import { useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import { useRepositoriesHook } from '../../hooks/useRepositories';

import { Header } from './styles';
import { RepositoryInfo } from '../../components/Repository/RepositoryInfo';
import { RepositoryIssues } from '../../components/Repository/RepositoryIssues';

export function Repository() {
  const {
    getRepository,
    getRepositoryIssues,
    repository,
    issues,
    isGetRepositoryLoading,
    isGetRepositoryError,
    isGetRepositoryIssuesError,
    isGetRepositoryIssuesLoading
  } = useRepositoriesHook()

  const match = useMatch('/repository/:repository*');

  const repositoryName = match?.pathname.replace('/repository/', '')!;

  useEffect(() => {
    if (repositoryName) {
      getRepository(repositoryName)
    }
  }, [repositoryName]);

  useEffect(() => {
    if (repositoryName && repository?.open_issues_count) {
      getRepositoryIssues(repositoryName)
    }
  }, [repositoryName, repository?.open_issues_count]);

  return (
    <>
      <Header>
        <Link to="/">
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