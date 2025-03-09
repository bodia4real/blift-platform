import React, { useEffect, useState } from "react";
import styled from "styled-components";
import showPassword from "../../assets/icon-eye.svg";
import hidePassword from "../../assets/icon-eye-off.svg";

const Input = ({
  label,
  type,
  name,
  maxLength,
  required,
  autoComplete,
  value,
  onValueChange,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorInput, setErrorInput] = useState(error || "");
  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  useEffect(() => {
    setErrorInput(error);
  }, [error]);

  const resetErrorHandler = () => {
    setErrorInput("");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    onValueChange(name, inputValue);
  };

  return (
    <InputWrapper $isValid={!errorInput} $isPasswordField={type === "password"}>
      {errorInput && <ErrorText>{errorInput}</ErrorText>}
      <div>
        <input
          autoComplete={autoComplete}
          onFocus={resetErrorHandler}
          onChange={handleChange}
          type={inputType}
          id={name}
          name={name}
          value={value}
          maxLength={maxLength}
          required={required}
        />
        {type === "password" && (
          <TogglePasswordButton
            onClick={togglePasswordVisibility}
            type="button"
          >
            {isPasswordVisible ? (
              <img src={hidePassword} alt="Eye" />
            ) : (
              <img src={showPassword} alt="Crossed out eye" />
            )}
          </TogglePasswordButton>
        )}
      </div>
      <label htmlFor={name}>{label}</label>
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  label {
    color: var(--grey);
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 4px;
  }

  div:has(input:focus) + label {
    color: var(--hovered-gray);
  }

  div {
    position: relative;
    input {
      width: 100%;
      height: 46px;
      background-color: var(--white);
      border: 1px solid #edf1f3;
      border-radius: 10px;
      color: var(--black);
      padding: 12px 14px;
      padding-right: ${({ $isPasswordField }) =>
        $isPasswordField ? "40px" : "14px"};
      outline: none;
      font-size: 14px;
    }

    input:focus {
      border: 1px solid
        ${({ $isValid }) => ($isValid ? "var(--grey-focused)" : "var(--red)")};
    }

    @media (min-width: 768px) {
      input {
        border: 1px solid
          ${({ $isValid }) => ($isValid ? "#c8cbcc" : "var(--red)")};
      }
    }
  }
`;

const ErrorText = styled.span`
  color: var(--red);
  padding-left: 4px;
  margin-top: 4px;
  font-size: 12px;
  transition: color 0.3s ease-in-out;
`;

const TogglePasswordButton = styled.button`
  border: none;
  position: absolute;
  background: transparent;
  display: flex;
  right: 14px;
  top: 30%;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
  }
`;
