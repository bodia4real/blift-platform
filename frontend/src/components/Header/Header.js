import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { Divide as Hamburger } from "hamburger-react";
import NavMenu from "./NavMenu";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  function toggleNavMenu() {
    setNavOpen((prevState) => !prevState);
  }

  return (
    <HeaderWrapper>
      <div>
        <img src={logo} alt="logo" />
        <Hamburger color="#1a1c1e" onToggle={toggleNavMenu} toggled={navOpen} />
        <NavMenu isMenuOpen={navOpen} onCloseMenu={setNavOpen} />
      </div>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  height: 91px;

  & > div {
    padding: 0px 24px;
    margin: 0px auto;
    height: 100%;
    max-width: 760px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    img,
    .hamburger-react {
      z-index: 5;
    }

    @media (min-width: 768px) {
      padding: 0px 46px;
      max-width: 1284px;

      .hamburger-react {
        display: none;
      }
    }

    @media (min-width: 1080px) {
      padding: 0px 56px;
    }
  }

  @media (min-width: 768px) {
    background-color: white;
  }
`;
