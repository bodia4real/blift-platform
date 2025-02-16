import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ResendEmail = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer;
    if (!isDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsDisabled(true);
      setCountdown(30);
    }

    return () => clearInterval(timer);
  }, [isDisabled, countdown]);

  const handleResend = () => {
    setIsDisabled(false);
    setCountdown(30);
  };

  return (
    <Wrapper>
      Didn&apos;t receive an email?
      <button type="button" onClick={handleResend} disabled={!isDisabled}>
        {!isDisabled ? `Resend (${countdown}s)` : "Resend"}
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
    cursor: default;
  }
`;
