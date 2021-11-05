import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Movies from "./Movies";
import Viewers from "./Viewers";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";
import axios from "../axios";
import requests from "../requests";
import Footer from "./Footer";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMovies() {
      let tempMovies = await axios.get(requests.fetchTrending);

      dispatch(setMovies(tempMovies.data.results));
    }
    fetchMovies();
    //
  }, []);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Movies title="Recommended For You" />
    </Container>
  );
}

export default Home;

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
