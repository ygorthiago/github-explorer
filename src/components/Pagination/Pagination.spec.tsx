import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Pagination } from '.';

const mockedOnPageChange = jest.fn()

const paginationProps = {
  totalCountOfRegisters: 60,
  registersPerPage: 10,
  currentPage: 1,
  onPageChange: mockedOnPageChange,
}

describe('Pagination Component', () => {
  it('should be able to change the current page', () => {
    const { getByTestId } = render(<Pagination {...paginationProps} />);

    const pageTwo = getByTestId('pagination-item-2')

    fireEvent.click(pageTwo);

    expect(mockedOnPageChange).toBeCalled();
    
    waitFor(() => {
      expect(pageTwo).toBeDisabled();
    })
  });
  

  it('should be able to change the pagination data info based on current page', () => {
    const { getByTestId, rerender } = render(<Pagination {...paginationProps} />);

    const paginationDataInfo = getByTestId('pagination-data-info')

    expect(paginationDataInfo).toHaveTextContent('1 - 10 of 60')

    rerender(<Pagination {...paginationProps } currentPage={2} />)
    expect(paginationDataInfo).toHaveTextContent('11 - 20 of 60')

    rerender(<Pagination {...paginationProps } currentPage={3} />)
    expect(paginationDataInfo).toHaveTextContent('21 - 30 of 60')

    rerender(<Pagination {...paginationProps } currentPage={4} />)  
    expect(paginationDataInfo).toHaveTextContent('31 - 40 of 60')

    rerender(<Pagination {...paginationProps } currentPage={6} />)
    expect(paginationDataInfo).toHaveTextContent('51 - 60 of 60')
  });
});
