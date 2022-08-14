import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useCookie from '@/utils/useCookies'

export default function AuthLayouts() {
  const location = useLocation()

  const { getToken } = useCookie()
  const ttoken = getToken()

  return (
    <>
      {ttoken ? (
        <Navigate to="search" state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  )
}
