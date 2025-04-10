import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import homeIcon from "../../assets/navigation/home.svg";
import caseIcon from "../../assets/navigation/case.svg";
import userIcon from "../../assets/navigation/user.svg";
import bellIcon from "../../assets/navigation/bell.svg";
import documentIcon from "../../assets/navigation/document.svg";
import { UserContext } from "../../context/UserContext";

const NavMenu = ({ isMenuOpen, onCloseMenu }) => {
  const location = useLocation();
  const { data } = useContext(UserContext);

  const navLinks = [
    { title: "Home", path: "/", iconSrc: homeIcon },
    { title: "Create Case", path: "/create-case", iconSrc: caseIcon },
    { title: "Hire RCIC", path: "/hire-rcic", iconSrc: caseIcon },
    { title: "Profile", path: "/profile", iconSrc: userIcon },
    { title: "Notifications", path: "/notifications", iconSrc: bellIcon },
    { title: "News", path: "/news", iconSrc: documentIcon },
  ];

  let filteredNavLinks;

  if (data?.role?.toLowerCase() === "consultant") {
    filteredNavLinks = navLinks.filter((link) => link.title !== "Hire RCIC");
  } else {
    filteredNavLinks = navLinks.filter((link) => link.title !== "Create Case");
  }

  function hideNavMenu() {
    onCloseMenu(false);
  }

  return (
    <StyledNavMenu $isOpen={isMenuOpen}>
      <NavList>
        {filteredNavLinks.map((link) => (
          <NavItem
            key={link.title}
            $active={location.pathname === link.path}
            onClick={hideNavMenu}
          >
            <img src={link.iconSrc} alt={link.title} />
            <Link to={link.path}>{link.title}</Link>
          </NavItem>
        ))}
      </NavList>
    </StyledNavMenu>
  );
};

export default NavMenu;

const StyledNavMenu = styled.nav`
  display: ${({ $isOpen }) => ($isOpen ? "grid" : "none")};
  background-color: white;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  min-height: 100%;
  z-index: 2;
  place-items: center;

  @media (min-width: 768px) {
    display: flex;
    background-color: transparent;
    min-height: inherit;
    position: static;
    width: inherit;
    justify-content: flex-end;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  row-gap: 24px;
  cursor: pointer;

  @media (min-width: 768px) {
    flex-direction: row;
    row-gap: 0px;
    column-gap: 28px;
    font-size: 16px;

    img {
      display: none;
    }
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  column-gap: 12px;
  a {
    text-decoration: none;
    color: ${({ $active }) => ($active ? "red" : "black")};
    font-weight: 500;
  }
`;
