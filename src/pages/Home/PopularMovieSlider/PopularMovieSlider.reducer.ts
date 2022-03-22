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
        dispatch({ type: "FetcMovie" });
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
              type: "FetchMovieSuccess",
              payload: {
                streaming: resStreaming.data.results,
                onTv: resOnTv.data.results,
              },
            })
          )
          .catch((err) =>
            dispatch({ type: "FetchMovieError", payload: err.message })
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
    | { type: "FetcMovie" }
    | {
        type: "FetchMovieSuccess";
        payload: {
          streaming: MovieStreamingPopular["results"];
          onTv: MovieTvPopular["results"];
        };
      }
    | { type: "FetchMovieError"; payload: string };
}

export const make = (prevState: State.t, action: Action.t): State.t => {
  switch (prevState.tag) {
    case "idle":
      switch (action.type) {
        case "FetcMovie":
          return {
            ...prevState,
            tag: "fetchingMovie",
          };
        default:
          return prevState;
      }
    case "fetchingMovie":
      switch (action.type) {
        case "FetchMovieSuccess":
          return {
            ...prevState,
            tag: "showingMovie",
            data: {
              streaming: action.payload.streaming,
              onTv: action.payload.onTv,
            },
          };
        case "FetchMovieError":
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
