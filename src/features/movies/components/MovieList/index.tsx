import React, { useState } from 'react'
import './index.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useLocation } from 'react-router-dom'

import CardPoster from '@/components/cards/CardPoster'
import { useGetMoviesQuery } from '@/features/movies'

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

function MovieList() {
  const location = useLocation()
  const [randomMovie] = useState<number>(
    Math.floor(Math.random() * (19 - 0 + 1)) + 0
  )

  const skeleton = [...Array(20)]

  const { isError, isFetching, isLoading, isSuccess, data, error } =
    useGetMoviesQuery({ filter: location.pathname.substring(1) })

  let movies: React.ReactNode
  let bannerMovie: React.ReactNode

  if (isLoading || isFetching) {
    movies = skeleton.map((_, index: string | number) => (
      <div key={index} className="h-[380px] w-[260px] rounded-md bg-gray-700" />
    ))
    bannerMovie = (
      <div className="h-[350px] w-full min-w-[253px] rounded-md bg-gray-700 " />
    )
  } else if (isSuccess) {
    movies = data.map((item: PropsType, index: string | number) => (
      <CardPoster {...item} key={index} />
    ))
    bannerMovie = (
      <>
        {' '}
        <div className="hero__movie">
          <LazyLoadImage
            alt={'movie_poster'}
            src={`https://image.tmdb.org/t/p/original/${data[randomMovie]?.backdrop_path}`}
          />
          <h2 className="hero__title">{data[randomMovie]?.title}</h2>
        </div>
      </>
    )
  } else if (isError) {
    movies = <p>{error as React.ReactNode}</p>
  }

  return (
    <section className="movie__list__section">
      <div className="mb-8 w-full px-4">{bannerMovie}</div>
      <div className="card__poster__list">{movies}</div>
    </section>
  )
}

export default MovieList
