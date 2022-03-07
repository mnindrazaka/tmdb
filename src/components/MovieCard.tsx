import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  GridItem,
  Stack,
  Flex,
} from "@chakra-ui/react";

type MovieCardProps =
  | { isLoading: true }
  | {
      poster_path: string;
      title: string;
      release_date: string;
      vote_count: number;
      isLoading?: false;
    };

const MovieCard = (props: MovieCardProps) => {
  return (
    <Box p={"6"}>
      {props.isLoading ? (
        <GridItem rounded={8} boxShadow={"base"} w={36}>
          <Box backgroundColor={"gray.300"} h={"52"} w={"36"} roundedTop={8} />
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            w={10}
            h={10}
            ml={2}
            backgroundColor={"gray.500"}
            position={"relative"}
            bottom={"6"}
            right={0}
          >
            <Text color={"white"}>NR</Text>
          </Flex>
        </GridItem>
      ) : (
        <Grid templateColumns="repeat(1, 1fr)" gap={6} my={6} pb={"20"}>
          <GridItem rounded={8} boxShadow={"base"} w={36}>
            <Image src={props.poster_path} h={"52"} w={"36"} roundedTop={8} />
            <CircularProgress
              value={props.vote_count / 100}
              color="green.500"
              ml={2}
              position={"relative"}
              bottom={"6"}
              right={0}
              textColor={"white"}
              backgroundColor="gray.900"
              borderRadius={"full"}
            >
              <CircularProgressLabel>
                {Math.round(props.vote_count / 100)}%
              </CircularProgressLabel>
            </CircularProgress>
            <VStack spacing={0} p={2} alignItems={"start"} mt={-4}>
              <Heading as={"h6"} size={"sm"}>
                {props.title}
              </Heading>
              <Text marginTop={8} color={"gray.700"}>
                {props.release_date}
              </Text>
            </VStack>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
};

export default MovieCard;
