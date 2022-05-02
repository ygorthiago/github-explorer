import { ErrorRetryContainer, ErrorText } from "./styles";

interface IErrorRetry {
  retryFunction: () => void;
  message?: string;
}

export function ErrorRetry({ retryFunction, message }: IErrorRetry): JSX.Element {
  return (
    <ErrorRetryContainer>
      <ErrorText>
        <h3>Some error occurred</h3>
        { message && <p>{message}</p> }
      </ErrorText>
      <button onClick={retryFunction} data-testid='retry-button'>
        Try again
      </button>
    </ErrorRetryContainer>
  );
}
