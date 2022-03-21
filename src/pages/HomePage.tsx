import { Box } from "@chakra-ui/react";
import MovieSliderContainer from "@/pages/MovieSliderContainer";

const HomePage = () => {
  return (
    <Box backgroundColor={"gray.100"} minH={"100vh"}>
      <MovieSliderContainer />
    </Box>
  );
};

export default HomePage;
