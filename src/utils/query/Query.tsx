import React from "react";
import * as QueryReducer from "@/utils/query/Query.reducer";
import * as QueryContext from "@/utils/query/Query.context";

export namespace Config {
  export type t = { lazy: boolean };
  export const make = (): t => ({ lazy: false });
}

export namespace Callback {
  export type t<T> = () => Promise<T>;
}

type t<T> = { state: QueryReducer.State.t<T>; refetch: () => void };

export const useQuery = <T,>(
  key: string,
  callback: Callback.t<T>,
  config: Config.t = Config.make()
): t<T> => {
  const { store, updateStore } = QueryContext.useContext();

  const [state, dispatch] = React.useReducer(
    QueryReducer.make<T>(),
    QueryReducer.State.make<T>(store, key)
  );

  React.useEffect(() => {
    QueryReducer.State.onChange(state, dispatch, callback, config);
  }, [state, dispatch, callback, config]);

  React.useEffect(() => {
    updateStore(key, state);
  }, [key, state, updateStore]);

  const refetch = React.useCallback(() => {
    dispatch({ tag: "fetch" });
  }, [dispatch]);

  React.useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        refetch();
      }
    });
  }, [refetch]);

  return { state, refetch };
};
