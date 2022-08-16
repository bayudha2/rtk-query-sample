import React, { useEffect, useState } from 'react'
import './index.scss'

import CardPoster from '@/components/cards/CardPoster'
import { useGetSearchMoviesQuery } from '@/features/movies'

type PropsType = {
  title: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  backdrop_path: string
  poster_path: string
  original_language: string
  id: number
}

function ResultMovie({ titleValue }: { titleValue: string }) {
  const [titleSearch, setTitleSearch] = useState('')
  const [search, setSearch] = useState(true)

  useEffect(() => {
    if (titleValue === '') return
    setSearch(false)
    setTitleSearch(titleValue.trim())
  }, [titleValue])

  const { isLoading, isError, isFetching, isSuccess, data, error } =
    useGetSearchMoviesQuery({ filter: titleSearch }, { skip: search })

  let movies: React.ReactNode
  if (isLoading || isFetching) {
    movies = [...Array(20)].map((data, index: string | number) => (
      <div key={index} className="h-[380px] w-[260px] rounded-md bg-gray-700">
        {data}
      </div>
    ))
  } else if (isSuccess) {
    movies = data.map((item: PropsType, index: string | number) => (
      <CardPoster {...item} key={index} />
    ))
  } else if (isError) {
    movies = <p>{error as React.ReactNode}</p>
  }
  return (
    <section className="movie__result__section">
      <div className="card__result__list">{movies}</div>
    </section>
  )
}

export default ResultMovie
