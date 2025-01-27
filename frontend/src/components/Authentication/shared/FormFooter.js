import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FormFooter = ({ question, action, navigationLink }) => {
  return (
    <FooterWrapper>
      {question}
      <Link to={navigationLink}>{action}</Link>
    </FooterWrapper>
  );
};

export default FormFooter;

const FooterWrapper = styled.footer`
  font-size: 12px;
  color: var(--grey);
  font-weight: 500;
  text-align: center;

  a {
    margin-left: 4px;
    font-size: 12px;
    text-align: end;
    font-weight: 600;
    color: var(--red);
    margin-bottom: 24px;
    cursor: pointer;
    text-decoration: none;
  }
`;
