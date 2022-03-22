import axios from "axios";
import { MovieStreamingPopular, MovieTvPopular } from "@/__generated__/api";

type State =
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

type Action =
  | { type: "FetcMovie" }
  | {
      type: "FetchMovieSuccess";
      payload: {
        streaming: MovieStreamingPopular["results"];
        onTv: MovieTvPopular["results"];
      };
    }
  | { type: "FetchMovieError"; payload: string };

export const initialState: State = {
  tag: "idle",
};

export const onStateChangeMovieSlider = (
  state: State,
  sendMovie: (action: Action) => void
) => {
  switch (state.tag) {
    case "idle":
      sendMovie({ type: "FetcMovie" });
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
          sendMovie({
            type: "FetchMovieSuccess",
            payload: {
              streaming: resStreaming.data.results,
              onTv: resOnTv.data.results,
            },
          })
        )
        .catch((err) =>
          sendMovie({ type: "FetchMovieError", payload: err.message })
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

export const MovieSliderReducer = (prevState: State, action: Action): State => {
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
