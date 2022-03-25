import * as Query from "@/utils/query/Query";
import * as QueryContext from "@/utils/query/Query.context";

export namespace State {
  export type t<T> =
    | { tag: "idle" }
    | { tag: "loading" }
    | { tag: "success"; data: T }
    | { tag: "error"; error: Error };

  export const onChange = <T>(
    state: t<T>,
    dispatch: React.Dispatch<Action.t<T>>,
    callback: Query.Callback.t<T>,
    config: Query.Config.t
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

  export const make = <T>(store: QueryContext.Store.t, key: string): t<T> => {
    const state = store[key];
    return state ?? { tag: "idle" };
  };
}

export namespace Action {
  export type t<T> =
    | { tag: "fetch" }
    | { tag: "fetchSuccess"; data: T }
    | { tag: "fetchError"; error: Error };
}

export const make =
  <T>() =>
  (state: State.t<T>, action: Action.t<T>): State.t<T> => {
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
      case "error": {
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
      default: {
        const exhaustiveCheck: never = state;
        return exhaustiveCheck;
      }
    }
  };
