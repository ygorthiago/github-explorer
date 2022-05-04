import { useEffect, useState } from 'react';
import { BiGitPullRequest } from 'react-icons/bi';
import { VscIssues } from 'react-icons/vsc';
import { FiChevronRight } from 'react-icons/fi';

import { Loader } from '../../Loader';
import { ErrorRetry } from '../../ErrorRetry';
import { Pagination } from '../../Pagination';

import { useRepositoriesHook } from '../../../hooks/useRepositories';

import { RepositoryIssuesContainer, Wrapper } from './styles';

interface IRepositoryIssues {
  repositoryName: string
  totalIssues: number
}

export function RepositoryIssues({
  repositoryName,
  totalIssues,
}: IRepositoryIssues) {
  const {
    getRepositoryIssues,
    issues,
    isGetRepositoryIssuesError,
    isGetRepositoryIssuesLoading,
  } = useRepositoriesHook()

  const [page, setPage] = useState(1);
  const registersPerPage = 10;

  useEffect(() => {
    getRepositoryIssues(repositoryName, page)
  }, [repositoryName, page]);

  const mustRenderIssues = !!issues.length && !isGetRepositoryIssuesError

  return (
    <RepositoryIssuesContainer data-testid="repository-issues">
      {mustRenderIssues && (
        <>
          <h2>Trending open issues/pull requests</h2>
          {issues.map(issue => (
            <a key={issue.id} href={issue.html_url} target="_blank">
              {issue.pull_request ? <BiGitPullRequest /> : <VscIssues />}
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={20} />
            </a>
          ))}
          
          {totalIssues > registersPerPage && (
            <Pagination 
              totalCountOfRegisters={totalIssues}
              registersPerPage={registersPerPage}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {page === 1 && isGetRepositoryIssuesLoading && ( 
        <Wrapper data-testid='repository-issues-loader'>
          <Loader />
        </Wrapper>
      )}

      {isGetRepositoryIssuesError && ( 
        <Wrapper data-testid='repository-issues-error'>
          <ErrorRetry retryFunction={() => getRepositoryIssues(repositoryName, page)} />
        </Wrapper>
      )}
    </RepositoryIssuesContainer>	
  )
}