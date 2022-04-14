import { IRepository } from "../../../types";
import { ErrorRetry } from "../../ErrorRetry";
import { Loader } from "../../Loader";
import { Wrapper, RepositoryInfoContainer } from "./styles";

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
    <RepositoryInfoContainer data-testid="repository-info">
      { repository && (
        <>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              loading="lazy"
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
        <Wrapper data-testid='repository-info-loader'>
          <Loader />
        </Wrapper>
      )}

      {isError && (
        <Wrapper data-testid='repository-info-error'>
          <ErrorRetry retryFunction={retryFunction}  />
        </Wrapper>
      )}
    </RepositoryInfoContainer>
  )
}