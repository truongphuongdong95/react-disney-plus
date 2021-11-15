import React, {useEffect} from "react";
import styled from "styled-components";
import {
  selectNameLogin,
  selectPhotoLogin,
  setLogin,
  setLogout,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth, provider } from "../firebase";
import { useHistory,Link } from "react-router-dom";

function Header() {
  const userName = useSelector(selectNameLogin);
  const userPhoto = useSelector(selectPhotoLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setLogin({
            name: user.name,
            emai: user.email,
            photo: user.picture,
          })
        );
        history.push("/");
      }
    });
  }, []);

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.additionalUserInfo.profile;
      console.log(user);
      dispatch(
        setLogin({
          name: user.name,
          emai: user.email,
          photo: user.picture,
        })
      );
      history.push("/");
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setLogout());
      history.push("/login");
    });
  };

  return (
    <Nav>
      <Logo src={process.env.PUBLIC_URL + '/images/logo.svg'} />
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <Link to="/react-disney-plus">
              <img src={process.env.PUBLIC_URL + '/images/home-icon.svg'} />
              <span>Home</span>
            </Link>

            <Link to="/react-disney-plus/search">
              <img src={process.env.PUBLIC_URL + '/images/search-icon.svg'} />
              <span>Search</span>
            </Link>

            <Link to="/react-disney-plus/watch-list">
              <img src={process.env.PUBLIC_URL + '/images/watchlist-icon.svg'} />
              <span>Watchlist</span>
            </Link>
            <Link to="/react-disney-plus/originals">
              <img src={process.env.PUBLIC_URL + '/images/original-icon.svg'} />
              <span>Original</span>
            </Link>
            <Link to="/react-disney-plus/movie-up-coming">
              <img src={process.env.PUBLIC_URL + '/images/movie-icon.svg'} />
              <span>Movies</span>
            </Link>
            <Link to="/react-disney-plus/series-tv">
              <img src={process.env.PUBLIC_URL + '/images/series-icon.svg'} />
              <span>Series</span>
            </Link>
          </NavMenu>
          {
            !userPhoto ?  <UserImg onClick={signOut} src="http://takesphoto.com/img/user.png" /> : 
            <UserImg onClick={signOut} src={userPhoto} />
          }
         
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;
const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    color: #fff;
    text-decoration: none;

    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &::after {
        content: " ";
        height: 2px;
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span::after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 30px;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    cursor: pointer;
  }
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
