import React from 'react';
import { IPagination } from './types';
import { styles } from './styled';

const Pagination: React.FC<IPagination> = ({ currentPage, totalPages, onPageChange }) => {
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div style={styles.pagination}>
      {pages?.length > 0 && pages.map((page) => (
        <button
          key={page}
          disabled={page === currentPage}
          onClick={() => onPageChange(page)}
          style={styles.pageButton}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
