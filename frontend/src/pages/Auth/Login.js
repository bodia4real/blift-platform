import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import FormIntro from "../../components/Authentication/shared/FormIntro";
import SocialAuthOptions from "../../components/Authentication/shared/SocialAuthOptions";
import FormFooter from "../../components/Authentication/shared/FormFooter";
import FieldsContainer from "../../components/UI/FieldsContainer";
import { loginFormFields as formFields } from "../../data/authFormFields";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleValueChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <LoginWrapper>
      <FormIntro
        title="Sign in to your Account"
        description="Please enter your email and password to log in and access your account securely."
      />
      <form onSubmit={handleLoginSubmit}>
        <FieldsContainer $marginBottom="24px">
          {formFields.map((field) => (
            <Input
              key={field.id}
              label={field.label}
              type={field.type}
              value={formData[field.name]}
              name={field.name}
              onValueChange={handleValueChange}
            />
          ))}
        </FieldsContainer>
        <Link className="auth-action-text">Forgot Password?</Link>
        <Button $primary>Log in</Button>
      </form>
      <div className="divider">Or</div>
      <SocialAuthOptions />
      <FormFooter
        question="Don't have an account?"
        action="Sign Up"
        navigationLink="register"
      />
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  form {
    margin-bottom: 24px;
  }

  .auth-action-text {
    font-size: 12px;
    text-align: end;
    font-weight: 500;
    color: var(--red);
    margin-bottom: 24px;
    cursor: pointer;
    display: block;
    text-decoration: none;
  }

  .divider {
    text-align: center;
    color: var(--grey);
    margin-bottom: 24px;
    font-size: 12px;
  }
`;
