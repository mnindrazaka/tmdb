import { Box } from "@chakra-ui/react";
import PopularMovieSlider from "@/pages/Home/PopularMovieSlider";

const Home = () => {
  return (
    <Box backgroundColor={"gray.100"} minH={"100vh"}>
      <PopularMovieSlider />
    </Box>
  );
};

export default Home;
