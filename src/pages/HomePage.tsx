import { Box } from "@chakra-ui/react";
import MovieCard from "@/components/MovieCard";

const HomePage = () => {
  return (
    <Box backgroundColor={"gray.100"}>
      <MovieCard isLoading />
      <MovieCard
        poster_path="https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg"
        title="Euphoria"
        release_date={"2021-12-15"}
        vote_count={8569}
      />
    </Box>
  );
};

export default HomePage;
