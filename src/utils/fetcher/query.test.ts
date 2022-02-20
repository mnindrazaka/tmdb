import { renderHook } from "@testing-library/react-hooks";
import { useQuery } from "./query";

it("should return success state with correct data", async () => {
  const data = ["aka", "andri"];
  const promise = new Promise<string[]>((resolve) =>
    setTimeout(() => resolve(data), 1000)
  );

  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery<string[]>("test", () => promise)
  );

  expect(result.current.state).toEqual({ tag: "loading" });

  await waitForNextUpdate();

  expect(result.current.state).toEqual({ tag: "success", data });
});

it("should return error state with correct error object", async () => {
  const error = new Error("something went wrong");
  const { result, waitForNextUpdate } = renderHook(() =>
    useQuery<[]>(
      "test",
      () =>
        new Promise((_resolve, reject) => setTimeout(() => reject(error), 1000))
    )
  );

  expect(result.current.state).toEqual({ tag: "loading" });

  await waitForNextUpdate();

  expect(result.current.state).toEqual({ tag: "error", error });
});
