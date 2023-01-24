import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoadig, setIsLoadig] = useState(false);
  const fetchMoviesHandler = async () => {
    setIsLoadig(true);
    const response = await fetch("https://swapi.dev/api/films/");
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
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoadig && <MoviesList movies={movies} />}
        {isLoadig && <p>Loadig...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
