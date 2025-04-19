export const OMDB_CONFIG = {
  BASE_URL: "http://www.omdbapi.com",
  API_KEY: "9911a46b",
};

export type Movie = {
  id: string;
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MovieDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{Source: string; Value: string}>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export const fetchMovies = async ({
                                    query,
                                  }: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = `${OMDB_CONFIG.BASE_URL}/?apikey=${OMDB_CONFIG.API_KEY}&s=${encodeURIComponent(query)}&type=movie`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    return [];
  }

  // Transform the response to match our expected format
  return data.Search.map((movie: any) => ({
    ...movie,
    id: movie.imdbID, // Add id property to match expected format in components
  }));
};

export const fetchMovieDetails = async (
    movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
        `${OMDB_CONFIG.BASE_URL}/?apikey=${OMDB_CONFIG.API_KEY}&i=${movieId}&plot=full`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Movie not found");
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};


export const getPopularMovies = async (): Promise<Movie[]> => {

  const popularMovieIds = [
    "tt0111161", // The Shawshank Redemption
    "tt0068646", // The Godfather
    "tt0071562", // The Godfather: Part II
    "tt0468569", // The Dark Knight
    "tt0050083", // 12 Angry Men
    "tt0108052", // Schindler's List
    "tt0167260", // The Lord of the Rings: The Return of the King
    "tt0110912", // Pulp Fiction
  ];

  const movies = await Promise.all(
      popularMovieIds.map(async (id) => {
        const response = await fetch(
            `${OMDB_CONFIG.BASE_URL}/?apikey=${OMDB_CONFIG.API_KEY}&i=${id}`
        );
        const data = await response.json();
        return {
          ...data,
          id: data.imdbID,
        };
      })
  );

  return movies;
};