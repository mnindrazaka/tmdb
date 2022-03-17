import { ComponentMeta, ComponentStory } from "@storybook/react";
import MovieSlider from "./MovieSlider";
import { fireEvent, waitFor, within } from "@storybook/testing-library";

const movies = {
  streaming: [
    {
      id: 1,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 2,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 3,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 4,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 5,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 6,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 7,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 8,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 9,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 10,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 11,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 12,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 13,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 14,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 15,
      title: "Euphoria",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
  ],
  onTv: [
    {
      id: 1,
      title: "Hura hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 2,
      title: "Hura Hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 3,
      title: "Hura Hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 4,
      title: "Hura Hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 5,
      title: "Hura Hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 6,
      title: "Hura Hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 7,
      title: "Hura Hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 8,
      title: "Hura Hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 9,
      title: "Hura Hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
    {
      id: 10,
      title: "Hura Hura",
      posterPath:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
      releaseDate: "2021-12-15",
      voteCount: 8569,
    },
  ],
};

const tabOptions = [
  { key: "streaming", title: "Streaming" },
  { key: "onTv", title: "On TV" },
];

export default {
  title: "Components/MovieSlider",
  component: MovieSlider,
} as ComponentMeta<typeof MovieSlider>;

const Template: ComponentStory<typeof MovieSlider> = (args) => (
  <MovieSlider {...args} />
);

export const Main = Template.bind({});
Main.args = {
  state: "loaded",
  movies,
  tabOptions,
  title: "Sedang Populer",
};

Main.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitFor(() => {
    fireEvent.click(canvas.getByRole("tab", { name: "Streaming" }));
    fireEvent.click(canvas.getByRole("tab", { name: "On TV" }));
  });
};

export const Loading = Template.bind({});
Loading.args = {
  state: "loading",
  tabOptions,
  title: "Sedang Populer",
};

export const Error = Template.bind({});
Error.args = {
  state: "error",
  tabOptions,
  title: "Sedang Populer",
  message: "Something went wrong",
};
