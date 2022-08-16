import { XCircleIcon } from '@heroicons/react/solid'
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useGetMovieQuery } from '@/features/movies'

function Movie() {
  const location = useLocation()
  const navigate = useNavigate()

  const { id, modal } = location.state as {
    id: number | undefined
    modal: boolean
  }

  const { isLoading, isSuccess, data } = useGetMovieQuery(id)

  const handleClose = () => {
    navigate(-1)
  }
  return (
    <div
      className="absolute top-0 left-0 z-10 h-screen w-screen"
      style={{ background: 'rgba(0, 0, 0, 0.9)' }}
    >
      {modal && (
        <button onClick={handleClose} className="absolute right-10 top-5">
          <XCircleIcon className="h-6 w-6 text-white" />
        </button>
      )}
      <div className="flex h-full w-full items-center justify-center">
        {isLoading && <div className="h-[80%] w-[80%] bg-emerald-500" />}
        {isSuccess && (
          <iframe
            width="80%"
            height="80%"
            style={{ height: '80%', width: '80%' }}
            src={`https://www.youtube.com/embed/${data.results[0]?.key}`}
            title={data.results[0]?.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  )
}

export default Movie
