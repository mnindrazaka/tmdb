import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import { Movie, moviesApi } from "@/utils/fetcher";

const HomePage = () => {
  const [loading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState<Movie[]>();

  React.useEffect(() => {
    setLoading(true);
    moviesApi
      .getMovies({ apiKey: "11dfe233fe073aab1aaa3389310e3358" })
      .then((res) => {
        setMovies(res.results);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        movies?.map((movie) => (
          <Heading as={"h1"} key={movie.id}>
            {movie.originalTitle}
          </Heading>
        ))
      )}
      <h1>hello world</h1>
      <button className="btn layout">Submit</button>
    </div>
  );
};

export default HomePage;
