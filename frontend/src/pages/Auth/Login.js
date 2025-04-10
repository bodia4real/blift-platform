import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import FormIntro from "../../components/Authentication/shared/FormIntro";
import SocialAuthOptions from "../../components/Authentication/shared/SocialAuthOptions";
import FormFooter from "../../components/Authentication/shared/FormFooter";
import FieldsContainer from "../../components/UI/FieldsContainer";
import { loginFormFields as formFields } from "../../data/authFormFields";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    emailForLogin: "",
    password: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, []);

  const handleValueChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError({});

    try {
      const validationResults = await Promise.all(
        formFields.map((field) =>
          axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/validate/${field.name}`,
              {
                params: { [field.param]: formData[field.name] },
              }
            )
            .then(() => ({ [field.name]: null }))
            .catch((error) => ({
              [field.name]: error.response?.data || "Invalid input",
            }))
        )
      );

      const newErrors = validationResults.reduce(
        (acc, error) => ({ ...acc, ...error }),
        {}
      );

      if (Object.values(newErrors).some((err) => err !== null)) {
        setError(newErrors);
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth`,
        {
          email: formData.emailForLogin,
          password: formData.password,
        }
      );

      console.log("Login successful:", response.data);
      login(formData.emailForLogin);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError({
        general: error.response?.data || "Login failed. Please try again.",
      });
    }
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
              error={error[field.name]}
              autoComplete={field.autoComplete}
              label={field.label}
              type={field.type}
              value={formData[field.name]}
              name={field.name}
              onValueChange={handleValueChange}
            />
          ))}
        </FieldsContainer>
        {error.general && <ErrorText>{error.general}</ErrorText>}
        <Link className="auth-action-text">Forgot Password?</Link>
        <Button $primary>Log in</Button>
      </form>
      <div className="divider">Or</div>
      <SocialAuthOptions />
      <FormFooter action="Sign Up" navigationLink="register">
        Don&apos;t have an account?
      </FormFooter>
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

const ErrorText = styled.p`
  color: var(--red);
  font-size: 12px;
  text-align: center;
  margin-bottom: 12px;
`;
