import React from "react";
import MovieSlider from "@/components/MovieSlider";
import {
  MovieSliderReducer,
  initialState,
  onStateChangeMovieSlider,
} from "@/pages/MovieSliderReducer";

const tabOptions = [
  { key: "streaming", title: "Streaming" },
  { key: "onTv", title: "On TV" },
];

const title = "Sedang Populer";

const MovieSliderContainer = () => {
  const [movieState, sendMovie] = React.useReducer(
    MovieSliderReducer,
    initialState
  );

  React.useEffect(() => {
    onStateChangeMovieSlider(movieState, sendMovie);
  }, [movieState]);

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
            voteCount: movie.vote_count,
          })),
          onTv: movieState.data.onTv.map((movie) => ({
            id: movie.id,
            posterPath: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            title: movie.name,
            releaseDate: movie.first_air_date,
            voteCount: movie.vote_count,
          })),
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
        message={movieState.error ?? ""}
      />
    );
  }
  return null;
};

export default MovieSliderContainer;
