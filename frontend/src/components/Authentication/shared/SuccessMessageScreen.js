import React from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";

const SuccessMessageScreen = ({ title, message, buttonText }) => {
  return (
    <ScreenWrapper>
      <h2>{title}</h2>
      <p>{message}</p>
      <Button $primary as={Link} to="/auth">
        {buttonText}
      </Button>
    </ScreenWrapper>
  );
};

export default SuccessMessageScreen;

const ScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 152px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    color: var(--black);
    font-size: 24px;
    margin-bottom: 12px;
  }

  p {
    text-align: center;
    color: var(--grey);
    font-size: 14px;
    margin-bottom: 32px;
  }

  a {
    text-decoration: none;
  }

  @media (min-width: 768px) {
    padding: 36px 0px;
  }
`;
