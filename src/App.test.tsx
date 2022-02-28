import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "App";

const renderApp = async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByText("loading..."));
};

test("App should have a heading.", async () => {
  await renderApp();
  const header = screen.getByRole("heading", { name: "hello world" });
  expect(header).toBeInTheDocument();
});

test("Should render list of name", async () => {
  await renderApp();

  const results = await screen.findByRole("heading", {
    name: "Leanne Graham",
  });

  expect(results).toBeInTheDocument();
});
