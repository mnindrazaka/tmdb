import { rest } from "msw";

export const handlers = [
  rest.get("https://api.themoviedb.org/3/movie/popular", (_req, res, ctx) => {
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
            vote_count: 8569
          }
        ]
      })
    );
  }),
  rest.get("https://api.themoviedb.org/3/tv/popular", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            backdrop_path: "/wvdWb5kTQipdMDqCclC6Y3zr4j3.jpg",
            first_air_date: "2010-10-31",
            genre_ids: [10759, 18, 10765],
            id: 1402,
            name: "The Walking Dead",
            origin_country: ["US"],
            original_language: "en",
            original_name: "The Walking Dead",
            overview:
              "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.",
            popularity: 1448.847,
            poster_path: "/xf9wuDcqlUPWABZNeDKPbZUjWx0.jpg",
            vote_average: 8.1,
            vote_count: 12754
          }
        ]
      })
    );
  })
];
