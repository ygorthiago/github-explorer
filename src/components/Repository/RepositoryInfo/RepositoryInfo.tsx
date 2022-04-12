import { ErrorRetry } from "../../ErrorRetry";
import { Loader } from "../../Loader";
import { Wrapper, RepositoryInfoContainer } from "./styles";

interface IRepository {
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface IRepositoryInfo {
  repository: IRepository | null;
  isLoading: boolean;
  isError: boolean;
  retryFunction: () => void
}

export function RepositoryInfo({ 
  repository,
  isLoading,
  isError,
  retryFunction,
}: IRepositoryInfo) {
  return (
    <RepositoryInfoContainer>
      { repository && (
        <>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <a href={repository.html_url} target="_blank">{repository.full_name}</a>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues/PRs open</span>
            </li>
            <li>
              <strong>{repository.watchers_count}</strong>
              <span>Watchers</span>
            </li>
          </ul>
        </>
        )
      }

      {isLoading && ( 
        <Wrapper>
          <Loader />
        </Wrapper>
      )}

      {isError &&( 
        <Wrapper>
          <ErrorRetry retryFunction={() => retryFunction()}  />
        </Wrapper>
      )}
    </RepositoryInfoContainer>
  )
}