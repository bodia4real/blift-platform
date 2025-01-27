import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const RootLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default RootLayout;

const Container = styled.div`
  padding: 0px 24px;
  margin: 0px auto;
  max-width: 760px;
  min-height: 100vh;
  height: 100%;
  width: 100%;

  @media (min-width: 768px) {
    padding: 46px;
    max-width: 100%;
    display: grid;
    place-items: center;
  }
`;
