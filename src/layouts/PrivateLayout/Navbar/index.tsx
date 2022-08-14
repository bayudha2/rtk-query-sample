import {
  UserCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import UserSetting from '@/components/Dropdown/UserSetting'

import './index.scss'
import addOutSideListener from '@/utils/handleClickOutside'

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<any>()

  useEffect(() => {
    addOutSideListener({
      filterElement: dropdownRef,
      setShowElement: setShowDropdown,
    })
  })

  return (
    <nav className="navbar__app">
      <NavLink
        to="search"
        className="bg-gradient-to-r from-cyan-400  to-emerald-500 bg-clip-text text-2xl font-extrabold text-transparent"
      >
        MOVEA
      </NavLink>
      <div className="nav__wrapper">
        <ul>
          <li>
            <NavLink
              to="upcoming"
              className={({ isActive }) => (isActive ? 'isActive' : undefined)}
            >
              Upcoming
            </NavLink>
          </li>
          <li>
            <NavLink
              to="top_rated"
              className={({ isActive }) => (isActive ? 'isActive' : undefined)}
            >
              Top Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="now_playing"
              className={({ isActive }) => (isActive ? 'isActive' : undefined)}
            >
              Now Playing
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="button__ignore__outside relative">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="button__ignore__outside space-normal flex items-center gap-1 text-white"
        >
          <UserCircleIcon className="button__ignore__outside h-7 w-7 text-gray-100" />
          {showDropdown ? (
            <>
              <ChevronUpIcon className="button__ignore__outside h-4 w-4 text-gray-600" />
            </>
          ) : (
            <ChevronDownIcon className="button__ignore__outside h-4 w-4 text-gray-600" />
          )}
        </button>
        {showDropdown && (
          <div ref={dropdownRef}>
            <UserSetting />
          </div>
        )}
      </div>
    </nav>
  )
}
