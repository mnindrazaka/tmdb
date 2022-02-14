import { render, screen } from "@testing-library/react";
import App from "./App";

test("App should have a heading.", () => {
  render(<App />);
  const header = screen.getByRole("heading", { name: "hello world" });
  expect(header).toBeInTheDocument();
});
