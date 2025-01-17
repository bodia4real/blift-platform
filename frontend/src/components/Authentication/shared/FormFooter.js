import React from "react";
import styled from "styled-components";

const FormFooter = ({ question, action }) => {
  return (
    <FooterWrapper>
      {question}
      <span>{action}</span>
    </FooterWrapper>
  );
};

export default FormFooter;

const FooterWrapper = styled.footer`
  font-size: 12px;
  color: var(--grey);
  font-weight: 500;
  text-align: center;

  span {
    margin-left: 4px;
    font-size: 12px;
    text-align: end;
    font-weight: 600;
    color: var(--red);
    margin-bottom: 24px;
  }
`;
