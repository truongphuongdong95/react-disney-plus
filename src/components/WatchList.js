import React from 'react'
import styled from 'styled-components';
import Movies from './Movies';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectWatchList } from './../features/movie/movieSlice';
import { setMovies, setWatchList } from '../features/movie/movieSlice';

function WatchList() {

    const dispatch = useDispatch();
    //const WatchLists = useSelector(selectWatchList);

    useEffect(() => {
        let watchLists = JSON.parse(localStorage.getItem("watchlist"));
       dispatch(setMovies(watchLists));
    }, [])

    return (
        <Container>
            <Movies title="My Watch List" />
        </Container>
    )
}

export default WatchList


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