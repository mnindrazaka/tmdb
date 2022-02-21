import React from "react";

type State<T> =
  | { tag: "idle" }
  | { tag: "loading" }
  | { tag: "success"; data: T }
  | { tag: "error"; error: Error };

type Action<T> =
  | { tag: "fetch" }
  | { tag: "fetchSuccess"; data: T }
  | { tag: "fetchError"; error: Error };

type Callback<T> = () => Promise<T>;

type Config = { lazy: boolean };
const defaultConfig: Config = { lazy: false };

const onStateChange = <T>(
  state: State<T>,
  dispatch: React.Dispatch<Action<T>>,
  callback: Callback<T>,
  config: Config
) => {
  switch (state.tag) {
    case "idle": {
      if (!config.lazy) dispatch({ tag: "fetch" });
      break;
    }
    case "loading": {
      callback()
        .then((data) => dispatch({ tag: "fetchSuccess", data }))
        .catch((error) => dispatch({ tag: "fetchError", error }));
      break;
    }
    case "success":
    case "error": {
      break;
    }
    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
};

const createReducer =
  <T>() =>
  (state: State<T>, action: Action<T>): State<T> => {
    switch (state.tag) {
      case "idle": {
        switch (action.tag) {
          case "fetch": {
            return { tag: "loading" };
          }
          case "fetchSuccess":
          case "fetchError": {
            return state;
          }
          default: {
            const exhaustiveCheck: never = action;
            return exhaustiveCheck;
          }
        }
      }
      case "loading": {
        switch (action.tag) {
          case "fetch": {
            return state;
          }
          case "fetchSuccess": {
            return { tag: "success", data: action.data };
          }
          case "fetchError": {
            return { tag: "error", error: action.error };
          }
          default: {
            const exhaustiveCheck: never = action;
            return exhaustiveCheck;
          }
        }
      }
      case "success": {
        switch (action.tag) {
          case "fetch":
          case "fetchSuccess":
          case "fetchError": {
            return state;
          }
          default: {
            const exhaustiveCheck: never = action;
            return exhaustiveCheck;
          }
        }
      }
      case "error": {
        switch (action.tag) {
          case "fetch":
          case "fetchSuccess":
          case "fetchError": {
            return state;
          }
          default: {
            const exhaustiveCheck: never = action;
            return exhaustiveCheck;
          }
        }
      }
      default: {
        const exhaustiveCheck: never = state;
        return exhaustiveCheck;
      }
    }
  };

type UseQuery<T> = { state: State<T>; refetch: () => void };

export const useQuery = <T>(
  key: string,
  callback: Callback<T>,
  config: Config = defaultConfig
): UseQuery<T> => {
  const [state, dispatch] = React.useReducer(createReducer<T>(), {
    tag: "idle",
  });

  React.useEffect(() => {
    onStateChange(state, dispatch, callback, config);
  }, [state, dispatch, callback, config]);

  const refetch = React.useCallback(() => {
    dispatch({ tag: "fetch" });
  }, [dispatch]);

  return { state, refetch };
};
