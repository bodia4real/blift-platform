import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <AuthWrapper>
      <header>
        <img src={logo} alt="Logo of Blift" />
      </header>
      <Outlet />
    </AuthWrapper>
  );
};

const AuthWrapper = styled.div`
  padding: 24px 0px;

  header {
    margin-bottom: 24px;
  }

  @media (min-width: 768px) {
    width: 520px;
    background: var(--white);
    margin: 0px auto;
    border-radius: 8px;
    padding: 44px 52px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
  }
`;

export default AuthLayout;
