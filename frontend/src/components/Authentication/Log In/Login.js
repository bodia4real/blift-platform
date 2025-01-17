import React from "react";
import styled from "styled-components";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import FormIntro from "../shared/FormIntro";
import SocialAuthOptions from "../shared/SocialAuthOptions";
import FormFooter from "../shared/FormFooter";

const Login = () => {
  const formFields = [
    { id: "field-1", label: "Email", type: "text", name: "email" },
    { id: "field-2", label: "Password", type: "password", name: "password" },
  ];

  return (
    <LoginWrapper>
      <FormIntro
        title="Sign in to your Account"
        description="Please enter your email and password to log in and access your account securely."
      />
      <form>
        {formFields.map((field) => (
          <Input
            key={field.id}
            label={field.label}
            type={field.type}
            name={field.name}
          />
        ))}
        <div className="auth-action-text">Forgot Password?</div>
        <Button $primary>Log in</Button>
      </form>
      <div className="divider">Or</div>
      <SocialAuthOptions />
      <FormFooter question="Don't have an account?" action="Sign Up" />
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
    font-weight: 600;
    color: var(--red);
    margin-bottom: 24px;
  }

  .divider {
    text-align: center;
    color: var(--grey);
    margin-bottom: 24px;
    font-size: 12px;
  }
`;
