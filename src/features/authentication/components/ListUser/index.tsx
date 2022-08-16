import type { ReactNode } from 'react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Pagination from '@/components/Pagination'
import TableUser from '@/components/Tables/TableUser'
import { useGetUsersReqresQuery } from '@/features/authentication'

function ListUser() {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isFetching, isError, isSuccess, error } =
    useGetUsersReqresQuery(currentPage)

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
              {data ? data.total : '...'}
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
            className="pointer-events-none rounded-md bg-gray-500 p-2 text-white"
          >
            Add User
          </Link>
        </div>
        <Pagination
          handlePageChange={handlePageClick}
          total_pages={data?.total_pages}
        />
      </div>
      <div className="mb-4 hidden overflow-x-auto whitespace-nowrap md:block">
        {userData}
      </div>
    </>
  )
}

export default ListUser
