import { BiGitPullRequest } from 'react-icons/bi';
import { VscIssues } from 'react-icons/vsc';
import { FiChevronRight } from 'react-icons/fi';

import { IRepositoryIssue } from '../../../types';
import { Loader } from '../../Loader';
import { ErrorRetry } from '../../ErrorRetry';

import { RepositoryIssuesContainer, Wrapper } from './styles';

interface IRepositoryIssues {
  repositoryIssues: IRepositoryIssue[];
  isLoading: boolean;
  isError: boolean;
  retryFunction: () => void
}

export function RepositoryIssues({
  repositoryIssues,
  isLoading,
  isError,
  retryFunction,
}: IRepositoryIssues) {
  return (
    <RepositoryIssuesContainer data-testid="repository-issues">
      {!!repositoryIssues.length && (
        <>
          <h2>Trending open issues/pull requests</h2>
          {repositoryIssues.map(issue => (
            <a key={issue.id} href={issue.html_url} target="_blank">
              {issue.pull_request ? <BiGitPullRequest /> : <VscIssues />}
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={20} />
            </a>
          ))}
        </>
      )}

      {isLoading && ( 
        <Wrapper data-testid='repository-issues-loader'>
          <Loader />
        </Wrapper>
      )}

      {isError && ( 
        <Wrapper data-testid='repository-issues-error'>
          <ErrorRetry retryFunction={retryFunction} />
        </Wrapper>
      )}
    </RepositoryIssuesContainer>	
  )
}