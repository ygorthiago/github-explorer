import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ToastContainer } from '.';
import { useToastContext } from '../../contexts/useToastContext';

const mockedUseToastContext = useToastContext as jest.Mock;

const mockedRemoveToast = jest.fn()

jest.mock('../../contexts/useToastContext');
jest.useFakeTimers();

describe('ToastContainer component', () => {
  beforeEach(() => {
    mockedUseToastContext.mockReturnValue({
      messages: { 
        title: 'Repository was found!',
        description: `It took 100ms`,
      },
      removeToast: mockedRemoveToast,
    });
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be able to render ToastContainer', () => {
    const toastContainer = render(<ToastContainer />);

    expect(toastContainer).toBeTruthy();
  });

  it('should be able to close TastContainer when close button is clicked', async () => {
    const { getByTestId } = render(<ToastContainer />);

    const closeToastButton = getByTestId('close-toast-button');

    fireEvent.click(closeToastButton);

    expect(mockedRemoveToast).toHaveBeenCalled();
  });

  it('should be able to close by itself after 3 seconds', async () => {
    render(<ToastContainer />);
    jest.runAllTimers();
  
    expect(mockedRemoveToast).toHaveBeenCalled();
  });
});
