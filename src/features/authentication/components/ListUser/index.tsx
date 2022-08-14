import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import type { ReactNode } from 'react'
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

import TableUser from '@/components/Tables/TableUser'
import { useGetUsersQuery } from '@/features/authentication'

function ListUser() {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isFetching, isError, isSuccess, error } =
    useGetUsersQuery(currentPage)

  let userData: ReactNode

  if (isLoading || isFetching) {
    userData = <h2 className="text-xl text-white">Getting Users...</h2>
  } else if (isSuccess) {
    userData = <TableUser users={data.data as any[]} />
  } else if (isError) {
    userData = <h2 className="text-xl text-white">{error.toString()}</h2>
  }

  const handlePageClick = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1)
  }

  return (
    <>
      <div className="mt-10 flex h-full w-full items-center justify-center md:hidden">
        <h1 className="text-xl font-bold text-white sm:text-4xl">
          View On Dekstop please..
        </h1>
      </div>
      <div className="mb-4 hidden flex-col items-center gap-10 md:flex lg:flex-row ">
        <div className="flex items-center gap-10">
          <h2 className="text-base text-gray-300">
            current active{' '}
            <span className="font-extrabold text-white">
              {data ? data.totalrecord : '...'}
            </span>{' '}
            users
          </h2>
          <Link
            to={{
              pathname: `/users/addUser`,
            }}
            state={{
              modal: true,
            }}
            className="rounded-md bg-emerald-500 p-2 text-white"
          >
            Add User
          </Link>
        </div>
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
          onPageChange={handlePageClick}
          className="flex items-center gap-6 text-sm text-gray-300"
          activeClassName="font-bold px-2 py-1 rounded-sm bg-gray-800"
          pageRangeDisplayed={10}
          pageCount={10}
          previousLabel={
            <div className="flex items-center gap-1">
              <ChevronLeftIcon className="h-5 w-5 text-gray-300 disabled:text-gray-500" />
              Prev
            </div>
          }
          previousClassName="text-sm font-semibold"
          renderOnZeroPageCount={() => null}
        />
      </div>
      <div className="mb-4 hidden overflow-x-auto whitespace-nowrap md:block">
        {userData}
      </div>
    </>
  )
}

export default ListUser
