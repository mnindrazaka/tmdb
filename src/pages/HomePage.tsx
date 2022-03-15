import { Box, Flex } from "@chakra-ui/react";
import MovieSlider from "@/components/MovieSlider";

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

const title = "Sedang Populer";

const HomePage = () => {
  return (
    <Box backgroundColor={"gray.100"} minH={"100vh"}>
      <MovieSlider
        state="loaded"
        movies={movies}
        tabOptions={tabOptions}
        title={title}
      />
      <MovieSlider state="loading" tabOptions={tabOptions} title={title} />
      <MovieSlider
        state="error"
        message="Something went wrong"
        tabOptions={tabOptions}
        title={title}
      />
    </Box>
  );
};

export default HomePage;
