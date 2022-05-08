import { useCallback, useEffect } from 'react';
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
    repository,
    isGetRepositoryLoading,
    isGetRepositoryError,
    getRepositoryReadme,
    readme,
    isGetReadmeLoading,
    isGetReadmeError,
  } = useRepositoriesHook();

  const match = useMatch('/repository/:repository*');

  const repositoryName = match?.pathname.replace('/repository/', '');

  const handleGetRepository = useCallback(() => {
    if (repositoryName) {
      getRepository(repositoryName);
    }
  }, [getRepository, repositoryName]);

  useEffect(() => {
    handleGetRepository();
  }, [getRepository, handleGetRepository, repositoryName]);

  useEffect(() => {
    if (repository) {
      getRepositoryReadme(repository.full_name);
    }
  }, [repositoryName, repository, getRepositoryReadme]);

  return (
    <>
      <Header>
        <Link to="/" data-testid="back-button">
          <FiChevronLeft size={16} />
          Go back
        </Link>
      </Header>

      <RepositoryInfo
        repository={repository}
        isLoading={isGetRepositoryLoading}
        isError={isGetRepositoryError}
        retryFunction={handleGetRepository}
      />

      {repository && (
        <RepositoryReadme
          readme={readme}
          isLoading={isGetReadmeLoading}
          isError={isGetReadmeError}
          retryFunction={() => getRepositoryReadme(repository.full_name)}
        />
      )}

      {!!repository?.open_issues_count && (
        <RepositoryIssues
          totalIssues={repository.open_issues_count}
          repositoryName={repository.full_name}
        />
      )}
    </>
  );
}
