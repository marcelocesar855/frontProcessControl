import React from 'react';
import { PropTypes } from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const Paginacao = ({
    hidden,
    pagesCount,
    currentPage,
    handlePageClick,
    handlePreviousClick,
    handleNextClick
   }) => {

    let pageLimit = 9;
    let start = 0;
    let end = pageLimit;

    if (pagesCount <= pageLimit) {
      pageLimit = pagesCount;
    }
    
    if (currentPage - 5 >= 0) {
      start = currentPage - 4;
    }
    
    if (start + pageLimit >= pagesCount) {
      start = pagesCount - pageLimit;
    }
    
    if (currentPage + 5 >= pageLimit) {
      end = currentPage + 5;
      pageLimit = end;
      if (pagesCount <= pageLimit) {
        pageLimit = pagesCount;
      }
    }

    return (
      <Pagination hidden={hidden}>
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink onClick={handlePreviousClick} previous href="#" />
        </PaginationItem>
        {[...Array(pageLimit)].map((page, i) => {
          if (i >= start && i < end) {
            return (
              <PaginationItem active={i === currentPage} key={i}>
              <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                  {i + 1}
              </PaginationLink>
              </PaginationItem>
            )}
          })}
        <PaginationItem disabled={currentPage >= pagesCount - 1}>
          <PaginationLink onClick={handleNextClick} next href="#" />
        </PaginationItem>
      </Pagination>
  )
}

Paginacao.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
 };

export default Paginacao;
