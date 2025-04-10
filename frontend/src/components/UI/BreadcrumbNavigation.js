import React from "react";
import { useNavigate } from "react-router-dom";
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M7.5 9L4.5 6L7.5 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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

  svg {
    margin-top: 4px;
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
`;
