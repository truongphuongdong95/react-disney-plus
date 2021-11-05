import React from 'react'
import Movies from './Movies'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import { setMovies } from '../features/movie/movieSlice';
import Series from './Series';

function Originals() {

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchMovie(){
            let movies = await axios.get(requests.fetchNetflixOriginals);
            //console.log(movies.data.results);
            dispatch(setMovies(movies.data.results));
        }
        fetchMovie();
    }, [])

    return (
        <Container>
            <Series title="Originals Disney" />
        </Container>
    )
}

export default Originals



const Container = styled.main `
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;

    &::before{
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index: -1;
    }
`;