import { Box } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import MovieCard from ".";

export default {
  title: "Components/MovieCard",
  component: MovieCard,
  decorators: [
    (Story) => (
      <Box width={170}>
        <Story />
      </Box>
    )
  ]
} as ComponentMeta<typeof MovieCard>;

const Template: ComponentStory<typeof MovieCard> = (args) => (
  <MovieCard {...args} />
);

export const Main = Template.bind({});
Main.args = {
  isLoading: false,
  posterPath:
    "https://www.themoviedb.org/t/p/w220_and_h330_face/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
  title: "Euphoria",
  releaseDate: "2021-12-15",
  voteCount: 8569
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};
