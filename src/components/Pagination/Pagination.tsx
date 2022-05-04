import { PaginationItem } from "./PaginationItem";
import { PaginationContainer, PaginationItemContainer } from "./styles";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0)
}

export function Pagination({ 
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
 }: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : [];

  const pageFirstRegister = (registersPerPage * (currentPage - 1)) + 1
  const pageLastRegister = currentPage === lastPage 
    ? totalCountOfRegisters 
    : registersPerPage * currentPage

  const renderLeftSiblings = currentPage > (1 + siblingsCount)
  const renderRightSiblings = (currentPage + siblingsCount) < lastPage

  const renderLeftEllipsis = currentPage > (2 + siblingsCount) 
  const renderRightEllipsis = (currentPage + 1 + siblingsCount) < lastPage

  return (
    <PaginationContainer>
      <div>
        <strong data-testid="pagination-data-info">
          {`${pageFirstRegister} - ${pageLastRegister} of ${totalCountOfRegisters}`}
        </strong>
      </div>
      <PaginationItemContainer>
        {renderLeftSiblings && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {renderLeftEllipsis && (
             <p>···</p> 
            )}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        })}

        <PaginationItem number={currentPage} isCurrent onPageChange={onPageChange} />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        })}

        {renderRightSiblings && (
          <>
            {renderRightEllipsis && <p>···</p>}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}

      </PaginationItemContainer>
    </PaginationContainer>
  )
}