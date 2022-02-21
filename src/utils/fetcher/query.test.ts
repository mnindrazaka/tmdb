import { renderHook } from "@testing-library/react-hooks";
import { useQuery } from "./query";

it("should return success state with correct data", async () => {
  const data = ["aka", "andri"];
  const fetchData = () =>
    new Promise<string[]>((resolve) => setTimeout(() => resolve(data), 1000));

  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery<string[]>("test", fetchData)
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
    useQuery<[]>("test", fetchData)
  );

  expect(result.current.state).toEqual({ tag: "loading" });

  await waitForNextUpdate();

  expect(result.current.state).toEqual({ tag: "error", error });
});
