import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React from 'react'
import ReactPaginate from 'react-paginate'

function Pagination({
  handlePageChange,
  total_pages,
}: {
  handlePageChange: (e: { selected: number }) => void
  total_pages: number | undefined
}) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <div className="flex items-center gap-1">
          Next
          <ChevronRightIcon className="h-5 w-5 text-gray-300 disabled:text-gray-500" />
        </div>
      }
      nextClassName="text-sm font-semibold"
      disabledClassName="text-gray-500 cursor-not-allowed pointer-events-none"
      onPageChange={handlePageChange}
      className="flex items-center gap-6 text-sm text-gray-300"
      activeClassName="font-bold px-2 py-1 rounded-sm bg-gray-800"
      pageRangeDisplayed={10}
      pageCount={total_pages || 0}
      previousLabel={
        <div className="flex items-center gap-1">
          <ChevronLeftIcon className="h-5 w-5 text-gray-300 disabled:text-gray-500" />
          Prev
        </div>
      }
      previousClassName="text-sm font-semibold"
      renderOnZeroPageCount={() => null}
    />
  )
}

export default Pagination
