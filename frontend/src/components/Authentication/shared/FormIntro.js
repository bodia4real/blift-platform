import React from "react";
import styled from "styled-components";

const FormIntro = ({ title, description }) => {
  return (
    <ContentWrapper>
      <h2>{title}</h2>
      <p>{description}</p>
    </ContentWrapper>
  );
};

export default FormIntro;

const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;

  h2 {
    color: var(--black);
    font-size: 24px;
  }

  p {
    color: var(--grey);
    font-size: 14px;
  }
`;
