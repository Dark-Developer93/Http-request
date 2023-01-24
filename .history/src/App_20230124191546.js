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
      const data = await response.json();

      if (!response.ok) {
        throw new Error("something went wrong");
      }
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
      setIsLoadig(false);
    }
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoadig && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoadig && movies.length === 0 && <p>Found no movies</p>}
        {!isLoadig && error && <p>{error}</p>}
        {isLoadig && <p>Loadig...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
