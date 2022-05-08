import { fireEvent, render } from '@testing-library/react';
import { ErrorRetry } from '.';

const mockedRetryFunction = jest.fn();

describe('ErrorRetry Component', () => {
  it('should be able to call retry function when button is clicked', () => {
    const { getByTestId } = render(
      <ErrorRetry retryFunction={mockedRetryFunction} />,
    );

    const retryButton = getByTestId('retry-button');

    fireEvent.click(retryButton);

    expect(mockedRetryFunction).toHaveBeenCalled();
  });
});
