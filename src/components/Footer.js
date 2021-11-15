import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

function Footer() {
  return (
    <Foot>
      <MenuFooter>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/home-icon.svg'} />
          <Link to="/react-disney-plus">Home</Link>
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/search-icon.svg'} />
          <Link to="/react-disney-plus/search">Search</Link>
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/watchlist-icon.svg'} />
          <Link to="/react-disney-plus/watch-list">WatchList</Link>
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/original-icon.svg'} />
          <Link to="/react-disney-plus/originals">Originals</Link>
        </li>
      </MenuFooter>
    </Foot>
  );
}

export default Footer;

const Foot = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  background: #545454c4;
  background-color: #59595980;
  backdrop-filter: blur(5px);
  position: fixed;
  left: 50%;
  bottom: -1.6rem;
  transform: translate(-50%, -50%);
`;

const MenuFooter = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 5px;

  @media (max-width: 768px) {
    margin-right: 35px;
  }

  li {
    display: flex;
    align-items: center;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 /72%) 0px 30px 22px -10px;
      transform: scale(1.5);
    }

    a {
      color: #fff;
      text-decoration: none;
    }

    img {
      height: 20px;
    }
  }
`;
