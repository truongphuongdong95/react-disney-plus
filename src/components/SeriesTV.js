import React,{useEffect} from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "../axios";
import requests from "../requests";
import { setMovies } from "../features/movie/movieSlice";
import Series from './Series';

function SeriesTV() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTVSeries = async () => {
      let series = await axios.get(requests.fetchSeriesTV);
      console.log(series);
      dispatch(setMovies(series.data.results));
    };
    fetchTVSeries();
  }, []);

  return (
    <Container>
      <Series title="Tivi Series" />
    </Container>
  );
}

export default SeriesTV;

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
