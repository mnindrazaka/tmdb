import { rest } from "msw";

export const handlers = [
  rest.get("https://api.themoviedb.org/3/movie/popular", (req, res, ctx) => {
    const apiKey = req.url.searchParams.get("api_key");
    if (apiKey)
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              adult: false,
              backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
              genre_ids: [28, 12, 878],
              id: 634649,
              original_language: "en",
              original_title: "Spider-Man: No Way Home",
              overview:
                "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
              popularity: 5944.171,
              poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
              release_date: "2021-12-15",
              title: "Spider-Man: No Way Home",
              video: false,
              vote_average: 8.3,
              vote_count: 8569,
            },
          ],
        })
      );
  }),
];
