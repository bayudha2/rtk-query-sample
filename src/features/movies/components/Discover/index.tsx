import { SelectorIcon } from '@heroicons/react/solid'
import type { ReactElement } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import './index.scss'
import CardMovie from '@/components/cards/CardMovie'
import FilterMovie from '@/components/Dropdown/FilterMovie'
import { useGetPopularMoviesQuery } from '@/features/movies'
import addOutSideListener from '@/utils/handleClickOutside'

type FilterTyple = {
  title: string
  desc: string
  color: string
  path: string
}[]

type PropsType = {
  title: string
  release_date: string
  overview: string
  vote_average: number
  backdrop_path: string
}

function Discover(): ReactElement {
  const [title, setTitle] = useState('Popular')
  const [showFilter, setShowFilter] = useState(false)
  const [filterValue, setFilterValue] = useState('popularity.desc')
  const filterRef = useRef<any>()

  useEffect(() => {
    addOutSideListener({
      filterElement: filterRef,
      setShowElement: setShowFilter,
    })
  })

  const filter: FilterTyple = [
    {
      color: 'text-red-600',
      desc: 'Sort movie by popularity',
      path: 'popularity.desc',
      title: 'Popular',
    },
    {
      color: 'text-green-600',
      desc: 'Sort movie by Revenue',
      path: 'revenue.desc',
      title: 'Revenue',
    },
    {
      color: 'text-yellow-600',
      desc: 'Sort movie by highest vote',
      path: 'vote_count.desc',
      title: 'Vote',
    },
  ]

  const {
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
    data: filterData,
  } = useGetPopularMoviesQuery({ filter: filterValue })

  let Discover: React.ReactNode
  if (isLoading) {
    Discover = <p className="text-white">Loading Data ...</p>
  } else if (isFetching) {
    Discover = <p className="text-white">Fetching Data ...</p>
  } else if (isSuccess) {
    Discover = filterData.map(
      (
        {
          backdrop_path,
          overview,
          release_date,
          title,
          vote_average,
        }: PropsType,
        idx: string
      ) => (
        <CardMovie
          vote_average={vote_average}
          backdrop_path={backdrop_path}
          release_date={release_date}
          overview={overview}
          title={title}
          key={idx}
        />
      )
    )
  } else if (isError) {
    Discover = <p>{error as React.ReactNode}</p>
  }

  return (
    <section className="discover__wrapper">
      <div className="heading relative">
        <h1>Movies</h1>
        <div className="sort__wrapper">
          <div className="flex gap-2">
            <p>Sort By</p>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="button__ignore__outside flex items-center"
            >
              <span>{title}</span>
              <SelectorIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          {showFilter && (
            <div ref={filterRef} className="dropdown__filter">
              {filter.map((item, idx) => (
                <FilterMovie
                  {...item}
                  setFilterValue={setFilterValue}
                  setShowFilter={setShowFilter}
                  setTitle={setTitle}
                  key={idx}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="list__movie">{Discover}</div>
    </section>
  )
}

export default Discover
