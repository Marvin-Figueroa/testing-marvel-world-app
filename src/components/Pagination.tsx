/* eslint-disable no-unused-vars */
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.scss';
import { usePagination } from '../hooks/usePagination';

interface IProps {
  totalItems: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  siblingCount?: number;
  currentPage: number;
}
const Pagination = ({
  totalItems,
  pageSize,
  onPageChange,
  siblingCount = 1,
  currentPage,
}: IProps) => {
  const paginationRange =
    usePagination({
      currentPage,
      totalItems,
      siblingCount,
      pageSize,
    }) || [];

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  function nextPage() {
    onPageChange(currentPage + 1);
  }

  function prevPage() {
    onPageChange(currentPage - 1);
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination'>
        <li className='page-item'>
          <button
            disabled={currentPage === 1}
            className='page-btn'
            onClick={prevPage}
            aria-label='Previous'>
            <FaChevronLeft />
          </button>
        </li>
        {paginationRange.map((pageNum, index) => {
          // When the element in pageNum is the DOTS ('...')
          if (typeof pageNum === 'string') {
            return (
              <li key={pageNum + index} className='page-item'>
                <button data-testid='dots' className='page-btn dots'>
                  &#8230;
                </button>
              </li>
            );
          }

          return (
            <li key={pageNum} className='page-item'>
              <button
                className={
                  pageNum === currentPage ? 'page-btn current-page' : 'page-btn'
                }
                onClick={() => onPageChange(pageNum)}>
                {pageNum}
              </button>
            </li>
          );
        })}
        <li className='page-item'>
          <button
            disabled={currentPage === lastPage}
            onClick={nextPage}
            className='page-btn'
            aria-label='Next'>
            <FaChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Pagination);
