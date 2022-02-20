import React from "react";

type IdleState = {
  tag: "idle";
};

type LoadingState = {
  tag: "loading";
};

type SuccessState<T> = {
  tag: "success";
  data: T;
};

type ErrorState = {
  tag: "error";
  error: Error;
};

type State<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;

type FetchAction = { tag: "fetch" };

type FetchSuccessAction<T> = { tag: "fetchSuccess"; data: T };

type FetchErrorAction = { tag: "fetchError"; error: Error };

type Action<T> = FetchAction | FetchSuccessAction<T> | FetchErrorAction;

type Callback<T> = () => Promise<T>;

const onStateChange = <T>(
  state: State<T>,
  dispatch: (action: Action<T>) => void,
  callback: Callback<T>
) => {
  switch (state.tag) {
    case "idle": {
      dispatch({ tag: "fetch" });
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
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
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
            const _exhaustiveCheck: never = action;
            return _exhaustiveCheck;
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
            const _exhaustiveCheck: never = action;
            return _exhaustiveCheck;
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
            const _exhaustiveCheck: never = action;
            return _exhaustiveCheck;
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
            const _exhaustiveCheck: never = action;
            return _exhaustiveCheck;
          }
        }
      }
      default: {
        const _exhaustiveCheck: never = state;
        return _exhaustiveCheck;
      }
    }
  };

export const useQuery = <T>(
  key: string,
  callback: Callback<T>
): { state: State<T> } => {
  const [state, dispatch] = React.useReducer(createReducer<T>(), {
    tag: "idle",
  });

  React.useEffect(() => {
    onStateChange(state, dispatch, callback);
  }, [state, dispatch, callback]);

  return { state };
};
