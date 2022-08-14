import { StarIcon, PlayIcon, CalendarIcon } from '@heroicons/react/solid'
import React from 'react'

import './index.scss'

type PropsType = {
  title: string
  release_date: string
  overview: string
  vote_average: number
  backdrop_path: string
}

function CardMovie({
  backdrop_path,
  overview,
  release_date,
  title,
  vote_average,
}: PropsType) {
  return (
    <div className="card__movie__wrapper">
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          className=""
          alt="sea"
        />
      </figure>
      <div className="detail__wrapper">
        <div className="detail__info__wrapper">
          <div className="flex items-center">
            <PlayIcon
              style={{ width: '30px' }}
              className="rounded-full text-white"
            />
          </div>
          <div className="detail__info">
            <h2>{title}</h2>
            <p>{overview}</p>
          </div>
        </div>
        <div className="detail__rate">
          <StarIcon className="h-5 w-5 text-yellow-300" />
          <p>{vote_average}</p>
        </div>
      </div>
      <div className="detail__date">
        <CalendarIcon className="h-4 w-4 text-white" />
        <p>{release_date}</p>
      </div>
    </div>
  )
}

export default CardMovie
