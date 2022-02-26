import React from "react";
import * as QueryReducer from "./QueryReducer";

export namespace Store {
  export type t = Record<string, QueryReducer.State.t<any>>;

  export const update = (
    store: t,
    key: string,
    state: QueryReducer.State.t<any>
  ): t => ({
    ...store,
    [key]: state,
  });

  export const make = (): t => ({});
}

export namespace Value {
  export type t = {
    store: Store.t;
    updateStore: (key: string, state: QueryReducer.State.t<any>) => void;
  };

  export const make = (): Value.t => ({
    store: Store.make(),
    updateStore: () => {},
  });
}

export namespace Context {
  export const ctx = React.createContext<Value.t>(Value.make());
  export const Provider = ctx.Provider;
}

export const useContext = () => React.useContext(Context.ctx);

export type Props = {
  initialStore?: Store.t;
};

export const Provider: React.FunctionComponent<Props> = ({
  initialStore,
  children,
}) => {
  const [store, setStore] = React.useState(initialStore ?? Value.make().store);

  const updateStore = React.useCallback(
    (key: string, state: QueryReducer.State.t<any>) => {
      setStore((prevStore) => Store.update(prevStore, key, state));
    },
    []
  );

  return (
    <Context.Provider value={{ store, updateStore }}>
      {children}
    </Context.Provider>
  );
};
