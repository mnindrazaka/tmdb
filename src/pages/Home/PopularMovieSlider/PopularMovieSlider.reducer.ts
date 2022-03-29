import { MovieStreamingPopular, MovieTvPopular } from "@/__generated__/api";
import * as Query from "@/utils/query";
import { match } from "ts-pattern";

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
        dispatch({ tag: "fetchMovie" });
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
            tag: "fetchMovieSuccess",
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
    | { tag: "fetchMovie" }
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
  return match<[State.t, Action.t], State.t>([prevState, action])
    .with([{ tag: "idle" }, { tag: "fetchMovie" }], () => ({
      tag: "fetchingMovie"
    }))
    .with([{ tag: "idle" }, { tag: "fetchMovieSuccess" }], () => prevState)
    .with([{ tag: "idle" }, { tag: "fetchMovieError" }], () => prevState)
    .with([{ tag: "fetchingMovie" }, { tag: "fetchMovie" }], () => prevState)
    .with(
      [{ tag: "fetchingMovie" }, { tag: "fetchMovieSuccess" }],
      ([_, action]) => ({
        tag: "showingMovie",
        data: {
          streaming: action.data.streaming,
          onTv: action.data.onTv
        }
      })
    )
    .with(
      [{ tag: "fetchingMovie" }, { tag: "fetchMovieError" }],
      ([_, action]) => ({
        tag: "error",
        message: action.message
      })
    )
    .with([{ tag: "showingMovie" }, { tag: "fetchMovie" }], () => prevState)
    .with(
      [{ tag: "showingMovie" }, { tag: "fetchMovieSuccess" }],
      ([_, action]) => ({
        tag: "showingMovie",
        data: {
          streaming: action.data.streaming,
          onTv: action.data.onTv
        }
      })
    )
    .with(
      [{ tag: "showingMovie" }, { tag: "fetchMovieError" }],
      ([_, action]) => ({
        tag: "error",
        message: action.message
      })
    )
    .with([{ tag: "error" }, { tag: "fetchMovie" }], () => prevState)
    .with([{ tag: "error" }, { tag: "fetchMovieSuccess" }], ([_, action]) => ({
      tag: "showingMovie",
      data: {
        streaming: action.data.streaming,
        onTv: action.data.onTv
      }
    }))
    .with([{ tag: "error" }, { tag: "fetchMovieError" }], ([_, action]) => ({
      tag: "error",
      message: action.message
    }))
    .exhaustive();
};
