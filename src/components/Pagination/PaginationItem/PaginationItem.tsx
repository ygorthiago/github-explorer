import { PaginationItemButton } from "./styles";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ number, isCurrent = false, onPageChange }: PaginationItemProps) {
    return(
      <PaginationItemButton
        isCurrent={isCurrent}
        disabled={isCurrent}
        data-testid={`pagination-item-${number}`}
        onClick={() => onPageChange(number)}
      >
        {number}
      </PaginationItemButton>
    );
}