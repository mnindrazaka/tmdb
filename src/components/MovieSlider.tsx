import {
  Box,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import MovieCard from "@/components/MovieCard";
import React from "react";

interface TabOption {
  key: string;
  title: string;
}

interface HeadingMovieSliderProps {
  title: string;
  tabOptions: TabOption[];
  onTabChange: (index: number) => void;
}

const HeadingMovieSlider = ({
  title,
  tabOptions,
  onTabChange,
}: HeadingMovieSliderProps) => {
  return (
    <Stack
      p={6}
      flexDirection={["column", "row"]}
      alignItems={["start", "center"]}
      spacing={[4, 0]}
    >
      <Heading as={"h6"} fontSize={"2xl"} mr={4}>
        {title}
      </Heading>
      <Tabs
        variant="soft-rounded"
        colorScheme="blue"
        borderRadius={"full"}
        border={"1px"}
        height={"8"}
        onChange={onTabChange}
      >
        <TabList height={"full"}>
          {tabOptions.map((option) => (
            <Tab key={option.key} value={option.key} color={"gray.800"}>
              {option.title}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </Stack>
  );
};

interface Movie {
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteCount: number;
}

type MovieSliderProps = { tabOptions: TabOption[]; title: string } & (
  | { state: "loading" }
  | {
      state: "error";
      message: string;
      title: string;
    }
  | {
      state: "loaded";
      movies: Record<string, Movie[]>;
      title: string;
    }
);

const MovieSlider = (props: MovieSliderProps) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  if (props.state === "loading") {
    return (
      <Box>
        <HeadingMovieSlider
          title={props.title}
          tabOptions={props.tabOptions}
          onTabChange={setSelectedCategoryIndex}
        />
        <Flex overflowX={"scroll"} pb={8}>
          <MovieCard isLoading mx={3} flex={1} />
          <MovieCard isLoading mx={3} flex={1} />
          <MovieCard isLoading mx={3} flex={1} />
          <MovieCard isLoading mx={3} flex={1} />
          <MovieCard isLoading mx={3} flex={1} />
          <MovieCard isLoading mx={3} flex={1} />
          <MovieCard isLoading mx={3} flex={1} />
        </Flex>
      </Box>
    );
  }

  if (props.state === "loaded") {
    return (
      <Box>
        <HeadingMovieSlider
          title={props.title}
          tabOptions={props.tabOptions}
          onTabChange={setSelectedCategoryIndex}
        />
        <Flex overflowX={"scroll"} pb={12}>
          {props.movies[props.tabOptions[selectedCategoryIndex].key].map(
            (movie) => (
              <MovieCard
                key={movie.id}
                posterPath={movie.posterPath}
                title={movie.title}
                releaseDate={movie.releaseDate}
                voteCount={movie.voteCount}
                mx={3}
                flexBasis={"300px"}
              />
            )
          )}
        </Flex>
      </Box>
    );
  }

  if (props.state === "error") {
    return (
      <Box>
        <HeadingMovieSlider
          title={props.title}
          tabOptions={props.tabOptions}
          onTabChange={setSelectedCategoryIndex}
        />
        <Heading as={"h4"} size={"sm"} mx={6} pb={12}>
          {props.message}
        </Heading>
      </Box>
    );
  }

  return null;
};

export default MovieSlider;
