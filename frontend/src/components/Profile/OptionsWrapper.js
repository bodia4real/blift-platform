import React from "react";
import styled from "styled-components";

const OptionsWrapper = ({ children }) => {
  return <OptionsContainer>{children}</OptionsContainer>;
};

export default OptionsWrapper;

const OptionsContainer = styled.div`
  background-color: var(--white);
  padding: 20px 16px;
  border-radius: 6px;

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
`;
