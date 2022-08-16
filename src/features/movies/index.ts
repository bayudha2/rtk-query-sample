import Discover from './components/Discover'
import MovieList from './components/MovieList'
import ResultMovie from './components/ResultMovie'
import {
  useGetMovieGenreQuery,
  useGetMovieQuery,
  useGetPopularMoviesQuery,
  useGetSearchMoviesQuery,
  useGetMoviesQuery,
  selectAllGenre,
  selectGenreById,
} from './services/api/movieSlice'

export {
  Discover,
  MovieList,
  ResultMovie,
  selectGenreById,
  selectAllGenre,
  useGetMovieGenreQuery,
  useGetMoviesQuery,
  useGetPopularMoviesQuery,
  useGetSearchMoviesQuery,
  useGetMovieQuery,
  // selectPopularMovies,
  // useGetMoviesQuery,
}
