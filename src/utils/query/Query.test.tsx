import { renderHook, act } from "@testing-library/react-hooks";
import * as Query from "./Query";
import * as QueryContext from "./QueryContext";

it("should return success state with correct data", async () => {
  const data = ["aka", "andri"];
  const fetchData = () =>
    new Promise<string[]>((resolve) => setTimeout(() => resolve(data), 1000));

  const { result, waitForNextUpdate } = renderHook(() =>
    Query.useQuery<string[]>("test", fetchData)
  );

  expect(result.current.state).toEqual({ tag: "loading" });

  await waitForNextUpdate();

  expect(result.current.state).toEqual({ tag: "success", data });
});

it("should return error state with correct error object", async () => {
  const error = new Error("something went wrong");
  const fetchData = () =>
    new Promise<[]>((_resolve, reject) =>
      setTimeout(() => reject(error), 1000)
    );

  const { result, waitForNextUpdate } = renderHook(() =>
    Query.useQuery<[]>("test", fetchData)
  );

  expect(result.current.state).toEqual({ tag: "loading" });

  await waitForNextUpdate();

  expect(result.current.state).toEqual({ tag: "error", error });
});

it("should not trigger fetch automatically when lazy is turned on", async () => {
  const data = ["aka", "andri"];
  const fetchData = () =>
    new Promise<string[]>((resolve) => setTimeout(() => resolve(data), 1000));

  const { result, waitForNextUpdate } = renderHook(() =>
    Query.useQuery<string[]>("test", fetchData, { lazy: true })
  );

  expect(result.current.state).toEqual({ tag: "idle" });

  act(() => result.current.refetch());

  await waitForNextUpdate();

  expect(result.current.state).toEqual({ tag: "success", data });
});

it("can trigger fetch after fetching has been success", async () => {
  const data = ["aka", "andri"];
  const fetchData = () =>
    new Promise<string[]>((resolve) => setTimeout(() => resolve(data), 1000));

  const { result, waitForNextUpdate } = renderHook(() =>
    Query.useQuery<string[]>("test", fetchData)
  );

  await waitForNextUpdate();
  expect(result.current.state).toEqual({ tag: "success", data });

  act(() => result.current.refetch());
  expect(result.current.state).toEqual({ tag: "loading" });

  await waitForNextUpdate();
  expect(result.current.state).toEqual({ tag: "success", data });
});

it("can trigger fetch after fetching has been error", async () => {
  const error = new Error("something went wrong");
  const fetchData = () =>
    new Promise<[]>((_resolve, reject) =>
      setTimeout(() => reject(error), 1000)
    );

  const { result, waitForNextUpdate } = renderHook(() =>
    Query.useQuery<string[]>("test", fetchData)
  );

  await waitForNextUpdate();
  expect(result.current.state).toEqual({ tag: "error", error });

  act(() => result.current.refetch());
  expect(result.current.state).toEqual({ tag: "loading" });

  await waitForNextUpdate();
  expect(result.current.state).toEqual({ tag: "error", error });
});

it("can get existing state from cache", async () => {
  const data = ["aka", "andri"];
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryContext.Provider initialStore={{ test: { tag: "success", data } }}>
      {children}
    </QueryContext.Provider>
  );

  const fetchData = () =>
    new Promise<string[]>((resolve) => setTimeout(() => resolve(data), 1000));
  const { result } = renderHook(
    () => Query.useQuery<string[]>("test", fetchData),
    {
      wrapper,
    }
  );

  expect(result.current.state).toEqual({ tag: "success", data });
});
