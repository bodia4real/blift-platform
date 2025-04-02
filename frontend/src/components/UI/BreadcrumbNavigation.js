import React from "react";
import { useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/arrow-left.svg";
import styled from "styled-components";

const BreadcrumbNavigation = ({ title }) => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <Navigation>
      <h2>{title}</h2>
      <BackButton onClick={goBackHandler}>
        <img src={arrowLeft} alt="Arrow left" />
        Back
      </BackButton>
    </Navigation>
  );
};

export default BreadcrumbNavigation;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--red);
  display: flex;
  align-items: center;
  cursor: pointer;
  font: inherit;

  img {
    margin-top: 4px;
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
`;
