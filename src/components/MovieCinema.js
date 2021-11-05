import React from "react";
import styled from "styled-components";
import Movies from "./Movies";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import { setMovies } from "../features/movie/movieSlice";

function MovieCinema() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieCinema = async () => {
      let movies = await axios.get(requests.fetchUpcomming);

      dispatch(setMovies(movies.data.results));
    };

    fetchMovieCinema();
  }, []);

  return (
    <Container>
      <Movies title="Movies Up Coming" />
    </Container>
  );
}

export default MovieCinema;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;

  &::before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
