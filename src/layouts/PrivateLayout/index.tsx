import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import Navbar from './Navbar'
import Sidebar from './Sidebar'

import { useGetMovieGenreQuery } from '@/features/movies'
import useCookie from '@/utils/useCookies'

export default function PrivateLayouts() {
  const location = useLocation()

  const { getToken } = useCookie()
  const ttoken = getToken()

  useGetMovieGenreQuery()

  return (
    <>
      {ttoken ? (
        <>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <Outlet />
          </div>{' '}
        </>
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  )
}
