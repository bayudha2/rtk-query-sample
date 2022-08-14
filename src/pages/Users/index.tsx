import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ListUser } from '@/features/authentication'

function Users() {
  const location = useLocation()
  return (
    <div className="flex w-full">
      <div className="m-0 lg:min-w-[27%]" />

      <section className="w-[73%] flex-1 overflow-scroll p-8">
        <ListUser />
      </section>
      {location.state ? (
        <Outlet />
      ) : (
        <Navigate to="/users" state={{ from: location }} replace />
      )}
    </div>
  )
}

export default Users
