import React, { useState } from "react";
import styled from "styled-components";

const ResendEmail = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleResend = () => {
    setIsDisabled(false);
  };

  return (
    <Wrapper>
      Didn&apos;t receive an email?
      <button type="button" onClick={handleResend} disabled={!isDisabled}>
        {!isDisabled ? `Resend (${2}s)` : "Resend"}
      </button>
    </Wrapper>
  );
};

export default ResendEmail;

const Wrapper = styled.div`
  font-size: 12px;
  text-align: end;
  font-weight: 500;
  color: var(--grey);
  margin-bottom: 24px;

  button {
    cursor: pointer;
    font-weight: 500;
    background: transparent;
    border: none;
    margin-left: 4px;
    font-size: 12px;
    color: var(--red);
  }

  button:disabled {
    color: var(--grey);
    font-weight: 400;
  }
`;
