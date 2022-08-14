import { ArrowRightIcon } from '@heroicons/react/solid'
import React from 'react'

import './index.scss'

type PropsType = {
  title: string
  desc: string
  color: string
  path: string
  setFilterValue: React.Dispatch<React.SetStateAction<string>>
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

function FilterMovie({
  desc,
  title,
  color,
  setFilterValue,
  setShowFilter,
  setTitle,
  path,
}: PropsType) {
  function getFilterMovie() {
    setFilterValue(path)
    setTitle(title)
    setShowFilter(false)
  }

  return (
    <button className="button__filter__movie" onClick={getFilterMovie}>
      <div className="filter__wrapper">
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div className="arrow__wrapper">
        <ArrowRightIcon className={`h-4 w-4 ${color}`} />
      </div>
    </button>
  )
}

export default FilterMovie
