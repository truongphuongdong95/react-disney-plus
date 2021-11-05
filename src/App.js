import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Detail from "./components/Detail";
import Login from "./components/Login";
import Originals from "./components/Originals";
import MovieCinema from "./components/MovieCinema";
import SeriesTV from "./components/SeriesTV";
import DetailSeries from "./components/DetailSeries";
import WatchList from "./components/WatchList";
import Search from "./components/Search";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/detail/:id">
            <Detail />
          </Route>

          <Route path="/detail-series/:id">
            <DetailSeries />
          </Route>

          <Route path="/series-tv">
            <SeriesTV />
          </Route>

          <Route path="/movie-up-coming">
            <MovieCinema />
          </Route>

          <Route path="/originals">
            <Originals />
          </Route>

          <Route exact path="/watch-list">
            <WatchList />
          </Route>

          <Route exact path="/search">
            <Search />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
