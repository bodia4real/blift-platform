import React from "react";
import styled from "styled-components";

const Input = ({ label, type, name, borderColor }) => {
  return (
    <InputWrapper borderColor={borderColor}>
      <input type={type} id={name} name={name} />
      <label htmlFor={name}>{label}</label>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 16px;

  label {
    color: var(--grey);
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 4px;
  }

  input {
    height: 46px;
    background-color: var(--white);
    border: 1px solid #edf1f3;
    border-radius: 10px;
    color: var(--black);
    padding: 12px 14px;
    outline: none;
    font-size: 14px;
  }

  input:focus {
    border: 1px solid var(--grey-focused);
  }

  input:focus + label {
    color: var(--grey-focused);
  }

  @media (min-width: 768px) {
    input {
      border: 1px solid #c8cbcc;
    }
  }
`;

export default Input;
