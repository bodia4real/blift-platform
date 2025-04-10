import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header/Header";

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLogged = localStorage.getItem("login") === "true";

    if (!isLogged && !location.pathname.startsWith("/auth")) {
      navigate("/auth", { replace: true });
    }

    setIsLoggedIn(isLogged);
    setIsLoading(false);
  }, [location, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {isLoggedIn && <Header />}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;

const Container = styled.div`
  padding: 0px 24px;
  margin: 0px auto;
  max-width: 760px;
  height: 100%;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0px 46px;
    max-width: 1284px;
  }

  @media (min-width: 1080px) {
    padding: 0px 56px;
  }
`;
