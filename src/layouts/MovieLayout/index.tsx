import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function MovieLayout() {
  const location = useLocation()

  return (
    <>
      {location.state ? (
        <Outlet />
      ) : (
        <Navigate to="/search" state={{ from: location }} replace />
      )}
    </>
  )
}
