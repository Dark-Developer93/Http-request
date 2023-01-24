import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoadig, setIsLoadig] = useState(false);
  const [error, setError] = useState(null);
  const fetchMoviesHandler = async () => {
    setIsLoadig(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();

      const transformesMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformesMovies);
      setIsLoadig(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoadig(false);
  };

  let content = <p>Found no movies</p>;

  if (!isLoading && movies.length > 0) {
    content = <MoviesList movies={movies} />;
  } else if (!isLoading && error) {
    content = <p>{error}</p>;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
