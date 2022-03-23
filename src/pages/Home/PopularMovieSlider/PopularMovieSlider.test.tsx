import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import PopularMovieSlider from "@/pages/Home/PopularMovieSlider";
import {
  title,
  tabOptions,
} from "@/pages/Home/PopularMovieSlider/PopularMovieSlider";
import { server } from "@/mocks/server";
import { rest } from "msw";

const titleSlider = () => screen.getByRole("heading", { name: title });
const tabStreaming = () =>
  screen.getByRole("tab", { name: tabOptions[0].title });
const tabOnTv = () => screen.getByRole("tab", { name: tabOptions[1].title });
const titleMovieLoading = () => screen.getAllByText("NR")[0];

test("should have list of card loading variant", () => {
  render(<PopularMovieSlider />);

  expect(titleSlider()).toBeInTheDocument();
  expect(tabStreaming()).toBeInTheDocument();
  expect(tabOnTv()).toBeInTheDocument();
  expect(titleMovieLoading()).toBeInTheDocument();
});

test("should have list of card main variant", async () => {
  render(<PopularMovieSlider />);

  await waitForElementToBeRemoved(() => screen.getAllByText("NR")[0]);

  const titleMovie = screen.getByRole("heading", {
    name: "Spider-Man: No Way Home",
  });

  const formatDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date("2021-12-15"));
  const releaseDateMovie = screen.getByText(formatDate);

  expect(titleSlider()).toBeInTheDocument();
  expect(tabStreaming()).toBeInTheDocument();
  expect(tabOnTv()).toBeInTheDocument();
  expect(titleMovie).toBeInTheDocument();
  expect(releaseDateMovie).toBeInTheDocument();
});

test("should have a message error in error variant", async () => {
  server.use(
    rest.get("https://api.themoviedb.org/3/movie/popular", (req, res, ctx) => {
      const apiKey = req.url.searchParams.get("api_key");
      if (apiKey)
        return res(
          ctx.status(403),
          ctx.json({
            message: "Request failed with status code 403",
          })
        );
    })
  );
  render(<PopularMovieSlider />);

  await waitForElementToBeRemoved(() => screen.getAllByText("NR")[0]);

  const message = screen.getByRole("heading", {
    name: "Request failed with status code 403",
  });

  expect(message).toBeInTheDocument();
});
