import { ErrorRetryContainer } from "./styles";

interface IErrorRetry {
  retryFunction: () => void;
}

export function ErrorRetry({ retryFunction }: IErrorRetry): JSX.Element {
  return (
    <ErrorRetryContainer>
      <h3>Some error occurred</h3>
      <button onClick={retryFunction}>
        Try again
      </button>
    </ErrorRetryContainer>
  );
}
