import axios from "axios";
import { MovieStreamingPopular, MovieTvPopular } from "@/__generated__/api";

type State =
  | { states: "Idle" }
  | { states: "FetchingMovie" }
  | {
      states: "ShowingMovie";
      data: {
        streaming: MovieStreamingPopular["results"];
        onTv: MovieTvPopular["results"];
      };
    }
  | { states: "Error"; error: string };

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
  states: "Idle",
};

export const onStateChangeMovieSlider = (
  state: State,
  sendMovie: (action: Action) => void
) => {
  switch (state.states) {
    case "Idle":
      sendMovie({ type: "FetcMovie" });
      break;
    case "FetchingMovie":
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
    case "ShowingMovie":
      break;
    case "Error":
      break;
    default:
      return state;
  }
};

export const MovieSliderReducer = (prevState: State, action: Action): State => {
  switch (prevState.states) {
    case "Idle":
      switch (action.type) {
        case "FetcMovie":
          return {
            ...prevState,
            states: "FetchingMovie",
          };
        default:
          return prevState;
      }
    case "FetchingMovie":
      switch (action.type) {
        case "FetchMovieSuccess":
          return {
            ...prevState,
            states: "ShowingMovie",
            data: {
              streaming: action.payload.streaming,
              onTv: action.payload.onTv,
            },
          };
        case "FetchMovieError":
          return {
            ...prevState,
            states: "Error",
            error: action.payload,
          };
        default:
          return prevState;
      }
    case "Error":
      return prevState;
    case "ShowingMovie":
      return prevState;
    default:
      const exhaustiveCheck: never = prevState;
      return exhaustiveCheck;
  }
};
