export type Upcoming = {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: any[]
  total_pages: number
  total_results: number
}

export type Genre = {
  genres: {
    id: number
    name: string
  }[]
}

export type MovieType = {
  id: number
  results: {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: true
    published_at: string
    id: string
  }[]
}
