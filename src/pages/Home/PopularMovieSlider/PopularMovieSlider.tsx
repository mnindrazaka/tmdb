import React from "react";
import MovieSlider from "@/components/MovieSlider";
import * as MovieSliderReducer from "@/pages/Home/PopularMovieSlider/PopularMovieSlider.reducer";

const tabOptions = [
  { key: "streaming", title: "Streaming" },
  { key: "onTv", title: "On TV" }
];

const title = "Sedang Populer";

const PopularMovieSlider = () => {
  const [movieState, dispatch] = React.useReducer(
    MovieSliderReducer.make,
    MovieSliderReducer.State.make()
  );

  React.useEffect(() => {
    MovieSliderReducer.State.onChange(movieState, dispatch);
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
