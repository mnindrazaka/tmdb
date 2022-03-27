import * as Query from "@/utils/query/Query";
import * as QueryContext from "@/utils/query/Query.context";
import { match } from "ts-pattern";

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
    return match<t<T>, void>(state)
      .with({ tag: "idle" }, () => {
        if (!config.lazy) dispatch({ tag: "fetch" });
      })
      .with({ tag: "loading" }, () => {
        callback()
          .then((data) => dispatch({ tag: "fetchSuccess", data }))
          .catch((error) => dispatch({ tag: "fetchError", error }));
      })
      .with({ tag: "success" }, () => {})
      .with({ tag: "error" }, () => {})
      .exhaustive();
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
    return match<[State.t<T>, Action.t<T>], State.t<T>>([state, action])
      .with([{ tag: "idle" }, { tag: "fetch" }], () => ({ tag: "loading" }))
      .with([{ tag: "idle" }, { tag: "fetchSuccess" }], () => state)
      .with([{ tag: "idle" }, { tag: "fetchError" }], () => state)
      .with([{ tag: "loading" }, { tag: "fetch" }], () => state)
      .with([{ tag: "loading" }, { tag: "fetchSuccess" }], ([_, action]) => ({
        tag: "success",
        data: action.data
      }))
      .with([{ tag: "loading" }, { tag: "fetchError" }], ([_, action]) => ({
        tag: "error",
        error: action.error
      }))
      .with([{ tag: "success" }, { tag: "fetch" }], () => ({ tag: "loading" }))
      .with([{ tag: "success" }, { tag: "fetchSuccess" }], () => state)
      .with([{ tag: "success" }, { tag: "fetchError" }], () => state)
      .with([{ tag: "error" }, { tag: "fetch" }], () => ({ tag: "loading" }))
      .with([{ tag: "error" }, { tag: "fetchSuccess" }], () => state)
      .with([{ tag: "error" }, { tag: "fetchError" }], () => state)
      .exhaustive();
  };
