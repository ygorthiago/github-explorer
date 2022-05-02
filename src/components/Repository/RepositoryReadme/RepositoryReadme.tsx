import { ErrorRetry } from "../../ErrorRetry";
import { Loader } from "../../Loader";
import { Readme, RepositoryReadmeContainer, Wrapper } from "./styles";

interface IRepositoryReadme {
  readme: string;
  isLoading: boolean;
  isError: boolean;
  retryFunction: () => void
}

export function RepositoryReadme({ 
  readme,
  isLoading,
  isError,
  retryFunction,
}: IRepositoryReadme) {
  return (
    <RepositoryReadmeContainer data-testid="repository-readme">
      { readme && (
          <Readme dangerouslySetInnerHTML={{ __html: readme}} />
        )
      }

      {isLoading && ( 
        <Wrapper data-testid='repository-readme-loader'>
          <Loader />
        </Wrapper>
      )}

      {isError && (
        <Wrapper data-testid='repository-readme-error'>
          <ErrorRetry retryFunction={retryFunction}  />
        </Wrapper>
      )}
    </RepositoryReadmeContainer>
  )
}