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
