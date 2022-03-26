import React from "react";
import MovieSlider from "@/components/MovieSlider";
import * as MovieSliderReducer from "@/pages/Home/PopularMovieSlider/PopularMovieSlider.reducer";
import { useQuery } from "@/utils/query";
import { moviesApi } from "@/utils/fetcher";

export const tabOptionsStreaming = { key: "streaming", title: "Streaming" };
export const tabOptionsOnTv = { key: "onTv", title: "On TV" };
const tabOptions = [tabOptionsStreaming, tabOptionsOnTv];

export const title = "Sedang Populer";

const PopularMovieSlider = () => {
  const [movieState, dispatch] = React.useReducer(
    MovieSliderReducer.make,
    MovieSliderReducer.State.make()
  );

  const {
    state: fetchMoviesStreamingPopularState,
    refetch: fetchMoviesStreamingPopular
  } = useQuery(
    "popularStreamingMovies",
    () =>
      moviesApi.getMoviePopular({
        apiKey: "11dfe233fe073aab1aaa3389310e3358"
      }),
    { lazy: true }
  );

  const { state: fetchMoviesTvPopularState, refetch: fetchMoviesTvPopular } =
    useQuery(
      "popularTvMovies",
      () =>
        moviesApi.getMovieTvPopular({
          apiKey: "11dfe233fe073aab1aaa3389310e3358"
        }),
      { lazy: true }
    );

  React.useEffect(() => {
    MovieSliderReducer.State.onChange({
      state: movieState,
      dispatch,
      fetchMoviesStreamingPopularState,
      fetchMoviesStreamingPopular,
      fetchMoviesTvPopularState,
      fetchMoviesTvPopular
    });
  }, [
    movieState,
    dispatch,
    fetchMoviesStreamingPopularState,
    fetchMoviesStreamingPopular,
    fetchMoviesTvPopularState,
    fetchMoviesTvPopular
  ]);

  if (movieState.tag === "idle" || movieState.tag === "fetchingMovie") {
    return (
      <MovieSlider tabOptions={tabOptions} title={title} state="loading" />
    );
  }

  if (movieState.tag === "showingMovie") {
    return (
      <MovieSlider
        tabOptions={tabOptions}
        title={title}
        state="loaded"
        movies={{
          streaming: movieState.data.streaming.map((movie) => ({
            id: movie.id,
            posterPath: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            title: movie.title,
            releaseDate: movie.release_date,
            voteCount: movie.vote_count
          })),
          onTv: movieState.data.onTv.map((movie) => ({
            id: movie.id,
            posterPath: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            title: movie.name,
            releaseDate: movie.first_air_date,
            voteCount: movie.vote_count
          }))
        }}
      />
    );
  }

  if (movieState.tag === "error") {
    return (
      <MovieSlider
        tabOptions={tabOptions}
        title={title}
        state="error"
        message={movieState.message ?? ""}
      />
    );
  }
  return null;
};

export default PopularMovieSlider;
