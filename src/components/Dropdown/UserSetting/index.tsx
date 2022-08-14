import {
  LogoutIcon,
  UserGroupIcon,
  PlayIcon,
  StarIcon,
  BookmarkAltIcon,
} from '@heroicons/react/solid'
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

import useCookie from '@/utils/useCookies'

function UserSetting() {
  const { logout } = useCookie()
  const navigate = useNavigate()

  function handleLogout(): void {
    logout()
    navigate('/')
  }

  return (
    <div className="absolute right-1 top-8 rounded-md bg-gray-800">
      <div className="border-b border-solid border-gray-600 p-4">
        <p className="text-base font-semibold text-white">Developer</p>
        <p className="mt-2 text-xs text-blue-500">Developer1998@gmail.com</p>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Link
          to={'/users'}
          type="button"
          className="flex items-center gap-4 text-sm text-gray-400 transition ease-in-out hover:text-white"
        >
          <UserGroupIcon className="h-5 w-5" />
          User list
        </Link>
        <Link
          to={'/upcoming'}
          type="button"
          className="flex items-center gap-4 text-sm text-gray-400 transition ease-in-out hover:text-white md:hidden"
        >
          <BookmarkAltIcon className="h-5 w-5" />
          Upcoming
        </Link>
        <Link
          to={'/top_rated'}
          type="button"
          className="flex items-center gap-4 text-sm text-gray-400 transition ease-in-out hover:text-white md:hidden"
        >
          <StarIcon className="h-5 w-5" />
          Top Movies
        </Link>
        <Link
          to={'/now_playing'}
          type="button"
          className="flex items-center gap-4 text-sm text-gray-400 transition ease-in-out hover:text-white md:hidden"
        >
          <PlayIcon className="h-5 w-5" />
          Now Playing
        </Link>
        <button
          onClick={handleLogout}
          type="button"
          className="flex items-center gap-4 text-sm text-gray-400 transition ease-in-out hover:text-white"
        >
          <LogoutIcon className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default UserSetting
