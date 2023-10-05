import React, { useState } from "react";
import { useEffect } from "react";
import { ReactDOM } from "react";
import "./App.css";
import searchIcon from "./search.png";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=7eb0b314";
const movie1 = {
  Title: "Spiderman",
  Year: "1990",
  imdbID: "tt0100669",
  Type: "movie",
  Poster: "N/A",
};
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm , setSearchTerm]=useState([]);
  //fetching the api
  //async means a synchronous data take some time to fetch these movies
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  //creted a use effect
  useEffect(() => {
    searchMovies("spiderman");
  }, []);

  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
