{
  /*
  We need change absolute import path to general import, because when run test webpack can't detect folder /__generated__/
*/
}

import { Configuration, MoviesApi } from "../../__generated__/api";

export * from "../../__generated__/api";

const configuration = new Configuration({
  basePath: "https://api.themoviedb.org/3"
});

export const moviesApi = new MoviesApi(configuration);
