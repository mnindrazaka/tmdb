import axios from "axios";
import { MovieStreamingPopular, MovieTvPopular } from "@/__generated__/api";

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
    | { tag: "error"; error: string };

  export const onChange = (
    state: State.t,
    dispatch: (action: Action.t) => void
  ) => {
    switch (state.tag) {
      case "idle":
        dispatch({ tag: "fetcMovie" });
        break;
      case "fetchingMovie":
        const promiseStreaming = axios.get<MovieStreamingPopular>(
          "https://api.themoviedb.org/3/movie/popular?api_key=11dfe233fe073aab1aaa3389310e3358"
        );

        const promiseOnTv = axios.get<MovieTvPopular>(
          "https://api.themoviedb.org/3/tv/popular?api_key=11dfe233fe073aab1aaa3389310e3358"
        );

        Promise.all([promiseStreaming, promiseOnTv])
          .then(([resStreaming, resOnTv]) =>
            dispatch({
              tag: "fetchMovieSuccess",
              payload: {
                streaming: resStreaming.data.results,
                onTv: resOnTv.data.results,
              },
            })
          )
          .catch((err) =>
            dispatch({ tag: "fetchMovieError", payload: err.message })
          );
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
        payload: {
          streaming: MovieStreamingPopular["results"];
          onTv: MovieTvPopular["results"];
        };
      }
    | { tag: "fetchMovieError"; payload: string };
}

export const make = (prevState: State.t, action: Action.t): State.t => {
  switch (prevState.tag) {
    case "idle":
      switch (action.tag) {
        case "fetcMovie":
          return {
            ...prevState,
            tag: "fetchingMovie",
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
              streaming: action.payload.streaming,
              onTv: action.payload.onTv,
            },
          };
        case "fetchMovieError":
          return {
            ...prevState,
            tag: "error",
            error: action.payload,
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
