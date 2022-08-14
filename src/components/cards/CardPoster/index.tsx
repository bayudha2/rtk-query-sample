import { StarIcon, ChatAltIcon } from '@heroicons/react/solid'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useSelector } from 'react-redux'

import { selectAllGenre } from '@/features/movies'
import './index.scss'

type PropsType = {
  title: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  backdrop_path: string
  poster_path: string
  original_language: string
}

function CardPoster({
  backdrop_path,
  release_date,
  title,
  poster_path,
  original_language,
  genre_ids,
  vote_count,
  vote_average,
}: PropsType) {
  const genreState = useSelector(selectAllGenre)

  // function to convert genre id to name
  const genres = genre_ids.map((id: number) => {
    let name = ''
    genreState.forEach((item: any) => {
      if (id === item.id) {
        name = item.name
      }
    })
    return name
  })

  return (
    <div className="card__poster__wrapper">
      <div className="rounded-md">
        <LazyLoadImage
          alt={'movie_poster'}
          height={380}
          // placeholderSrc={'/images/asdasd.jpeg'}
          src={`https://image.tmdb.org/t/p/original/${poster_path}`} // use normal <img> attributes as props
          width={260}
        />
      </div>
      <div className="detail__wrapper">
        <p className="detail__loc__date">
          {original_language},{' '}
          <span>&nbsp;{release_date?.slice(0, 4) ?? '-'}</span>
        </p>
        <h2>{title}</h2>
        <div className="detail__rate__wrapper">
          <div className="vote__average">
            <StarIcon className="h-5 w-5 text-yellow-300" />
            <p>{vote_average}/10</p>
          </div>
          <div className="vote__count">
            <ChatAltIcon className="h-5 w-5 text-yellow-300" />
            <p>{vote_count}</p>
          </div>
        </div>
        <p className="genre__list">{genres.join(', ')}</p>
      </div>
    </div>
  )
}

export default CardPoster
