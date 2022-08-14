import React from 'react'
import './index.scss'

import { Discover } from '@/features/movies'

export default function Sidebar() {
  return (
    <section className="sidebar__app">
      <Discover />
    </section>
  )
}
