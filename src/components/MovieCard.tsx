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
  Flex,
  BoxProps,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

type MovieCardProps = (
  | { isLoading: true }
  | {
      isLoading?: false;
      posterPath: string;
      title: string;
      releaseDate: string;
      voteCount: number;
    }
) &
  BoxProps;

const MovieCard = (props: MovieCardProps) => {
  const { isLoading, ...boxProps } = props;

  return (
    <Box {...boxProps}>
      {props.isLoading ? (
        <Box rounded={8} boxShadow={"base"}>
          <Box backgroundColor={"gray.300"} h={"52"} roundedTop={8} />
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
          <Stack p={4}>
            <Skeleton height="12px" />
            <Skeleton height="12px" />
          </Stack>
        </Box>
      ) : (
        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
          <GridItem rounded={8} boxShadow={"base"}>
            <Image src={props.posterPath} h={"52"} w={"full"} roundedTop={8} />
            <CircularProgress
              value={props.voteCount / 100}
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
                {Math.round(props.voteCount / 100)}%
              </CircularProgressLabel>
            </CircularProgress>
            <VStack spacing={0} p={4} alignItems={"start"} mt={-4}>
              <Heading as={"h6"} size={"sm"}>
                {props.title}
              </Heading>
              <Text marginTop={8} color={"gray.700"}>
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(props.releaseDate))}
              </Text>
            </VStack>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
};

export default MovieCard;
