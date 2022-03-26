import { MovieStreamingPopular, MovieTvPopular } from "@/__generated__/api";
import * as Query from "@/utils/query";

export namespace State {
  export type t =
    | { tag: "idle" }
    | { tag: "fetchingMovie" }
    | {
        tag: "showingMovie";
        data: {
          streaming: MovieStreamingPopular["results"];
          onTv: MovieTvPopular["results"];
        };
      }
    | { tag: "error"; message: string };

  type onChangeParams = {
    state: State.t;
    dispatch: (action: Action.t) => void;
    fetchMoviesStreamingPopularState: Query.State.t<MovieStreamingPopular>;
    fetchMoviesStreamingPopular: () => void;
    fetchMoviesTvPopularState: Query.State.t<MovieTvPopular>;
    fetchMoviesTvPopular: () => void;
  };

  export const onChange = ({
    state,
    dispatch,
    fetchMoviesStreamingPopularState,
    fetchMoviesStreamingPopular,
    fetchMoviesTvPopularState,
    fetchMoviesTvPopular
  }: onChangeParams) => {
    switch (state.tag) {
      case "idle":
        dispatch({ tag: "fetcMovie" });
        break;
      case "fetchingMovie":
        if (fetchMoviesStreamingPopularState.tag === "idle") {
          fetchMoviesStreamingPopular();
        }

        if (fetchMoviesTvPopularState.tag === "idle") {
          fetchMoviesTvPopular();
        }

        if (
          fetchMoviesStreamingPopularState.tag === "success" &&
          fetchMoviesTvPopularState.tag === "success"
        ) {
          dispatch({
            tag: "fetchMovieSuccess",
            data: {
              streaming: fetchMoviesStreamingPopularState.data.results,
              onTv: fetchMoviesTvPopularState.data.results
            }
          });
        }

        if (fetchMoviesStreamingPopularState.tag === "error") {
          dispatch({
            tag: "fetchMovieError",
            message: fetchMoviesStreamingPopularState.error.message
          });
        }

        if (fetchMoviesTvPopularState.tag === "error") {
          dispatch({
            tag: "fetchMovieError",
            message: fetchMoviesTvPopularState.error.message
          });
        }
        break;
      case "showingMovie":
        break;
      case "error":
        break;
      default:
        return state;
    }
  };

  export const make = (): t => {
    return { tag: "idle" };
  };
}

export namespace Action {
  export type t =
    | { tag: "fetcMovie" }
    | {
        tag: "fetchMovieSuccess";
        data: {
          streaming: MovieStreamingPopular["results"];
          onTv: MovieTvPopular["results"];
        };
      }
    | { tag: "fetchMovieError"; message: string };
}

export const make = (prevState: State.t, action: Action.t): State.t => {
  switch (prevState.tag) {
    case "idle":
      switch (action.tag) {
        case "fetcMovie":
          return {
            ...prevState,
            tag: "fetchingMovie"
          };
        default:
          return prevState;
      }
    case "fetchingMovie":
      switch (action.tag) {
        case "fetchMovieSuccess":
          return {
            ...prevState,
            tag: "showingMovie",
            data: {
              streaming: action.data.streaming,
              onTv: action.data.onTv
            }
          };
        case "fetchMovieError":
          return {
            ...prevState,
            tag: "error",
            message: action.message
          };
        default:
          return prevState;
      }
    case "error":
      return prevState;
    case "showingMovie":
      return prevState;
    default:
      const exhaustiveCheck: never = prevState;
      return exhaustiveCheck;
  }
};
