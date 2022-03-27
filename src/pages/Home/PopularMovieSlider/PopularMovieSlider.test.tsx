import { server } from "@/mocks/server";
import { rest } from "msw";
import {
  render,
  screen,
  waitForElementToBeRemoved
} from "@testing-library/react";
import PopularMovieSlider from "@/pages/Home/PopularMovieSlider";
import {
  title,
  tabOptionsStreaming,
  tabOptionsOnTv
} from "@/pages/Home/PopularMovieSlider/PopularMovieSlider";
import { loadingText } from "@/components/MovieCard";
import * as PopularMovieSliderReducer from "@/pages/Home/PopularMovieSlider/PopularMovieSlider.reducer";

const renderPopularMovieSlider = async () => {
  render(<PopularMovieSlider />);

  await waitForElementToBeRemoved(() => screen.getAllByText(loadingText)[0]);

  const titleSlider = screen.getByRole("heading", { name: title });
  const tabStreaming = screen.getByRole("tab", {
    name: tabOptionsStreaming.title
  });
  const tabOnTv = screen.getByRole("tab", { name: tabOptionsOnTv.title });
  expect(titleSlider).toBeInTheDocument();
  expect(tabStreaming).toBeInTheDocument();
  expect(tabOnTv).toBeInTheDocument();

  return { titleSlider, tabStreaming, tabOnTv };
};

test("should have list of card main variant", async () => {
  await renderPopularMovieSlider();

  const titleMovie = screen.getByRole("heading", {
    name: "Spider-Man: No Way Home"
  });

  const formatDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date("2021-12-15"));
  const releaseDateMovie = screen.getByText(formatDate);

  expect(titleMovie).toBeInTheDocument();
  expect(releaseDateMovie).toBeInTheDocument();
});

test("should have a message error in error variant", async () => {
  const errorMessage = "Request failed with status code 403";
  server.use(
    rest.get("https://api.themoviedb.org/3/movie/popular", (req, res, ctx) => {
      return res(
        ctx.status(403),
        ctx.json({
          message: PopularMovieSliderReducer.State.errorMessage
        })
      );
    })
  );
  await renderPopularMovieSlider();
  const message = screen.getByRole("heading", {
    name: PopularMovieSliderReducer.State.errorMessage
  });

  expect(message).toBeInTheDocument();
});
