import { Box, Flex } from "@chakra-ui/react";
import MovieCard from "@/components/MovieCard";

const HomePage = () => {
  return (
    <Box backgroundColor={"gray.100"} h={"100vh"}>
      <Flex>
        <MovieCard isLoading flex={1} m={6} />
        <MovieCard
          posterPath="https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg"
          title="Euphoria"
          releaseDate={"2021-12-15"}
          voteCount={8569}
          flex={1}
          m={6}
        />
      </Flex>
    </Box>
  );
};

export default HomePage;
