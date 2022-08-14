import React from 'react'

import { MovieList } from '@/features/movies'

import './index.scss'

export default function Movies() {
  return (
    <section className="section__movies">
      <MovieList />
    </section>
  )
}
