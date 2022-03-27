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
    fetchMovieStreamingPopularState: Query.State.t<MovieStreamingPopular>;
    fetchMovieStreamingPopular: () => void;
    fetchMovieTvPopularState: Query.State.t<MovieTvPopular>;
    fetchMovieTvPopular: () => void;
  };

  export const errorMessage = "Failed to fetch movies";

  export const onChange = ({
    state,
    dispatch,
    fetchMovieStreamingPopularState,
    fetchMovieStreamingPopular,
    fetchMovieTvPopularState,
    fetchMovieTvPopular
  }: onChangeParams) => {
    switch (state.tag) {
      case "idle":
        dispatch({ tag: "fetcMovie" });
        break;
      case "fetchingMovie":
        if (fetchMovieStreamingPopularState.tag === "idle") {
          fetchMovieStreamingPopular();
        }

        if (fetchMovieTvPopularState.tag === "idle") {
          fetchMovieTvPopular();
        }

        if (
          fetchMovieStreamingPopularState.tag === "success" &&
          fetchMovieTvPopularState.tag === "success"
        ) {
          dispatch({
            tag: "fetchMovieuccess",
            data: {
              streaming: fetchMovieStreamingPopularState.data.results,
              onTv: fetchMovieTvPopularState.data.results
            }
          });
        }

        /*
        We need to hardcode the error message for now because we can't get the error message from Query lib
        
        TODO: fix Query lib so it can return the error message
        */
        if (fetchMovieStreamingPopularState.tag === "error") {
          dispatch({
            tag: "fetchMovieError",
            message: errorMessage
          });
        }

        if (fetchMovieTvPopularState.tag === "error") {
          dispatch({
            tag: "fetchMovieError",
            message: errorMessage
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
        tag: "fetchMovieuccess";
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
        case "fetchMovieuccess":
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
