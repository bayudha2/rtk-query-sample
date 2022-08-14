import { SearchIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'

import { ResultMovie } from '@/features/movies'

import './index.scss'
import debounce from '@/utils/useDebounce'

function Dashboard() {
  const searchRef = useRef<HTMLInputElement>(null)
  const [titleValue, setTitleValue] = useState('')

  useEffect(() => {
    if (null !== searchRef.current) searchRef.current.focus()
  }, [])

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    if (null !== searchRef.current) setTitleValue(searchRef.current.value)
  }

  return (
    <section className="search__section">
      <div className="search__hero mt-10">
        <h2>Search Movie</h2>
        <p>looking for movie, TV series, or something else?</p>

        <div className="search__wrapper">
          <input
            ref={searchRef}
            onKeyUp={() => debounce(handleSubmit)}
            type="text"
            placeholder="Search movie ..."
          />
          <button type="button" className="btn__search">
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      <div className="mt-8">
        <ResultMovie titleValue={titleValue} />
      </div>
    </section>
  )
}

export default Dashboard
