import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormIntro from "../../components/Authentication/shared/FormIntro";
import SocialAuthOptions from "../../components/Authentication/shared/SocialAuthOptions";
import FormFooter from "../../components/Authentication/shared/FormFooter";
import ProgressBar from "../../components/Authentication/SignUp/ProgressBar";
import StepNavigation from "../../components/Authentication/SignUp/StepNavigation";
import { registrationFormFields as steps } from "../../data/authFormFields";
import SuccessMessageScreen from "../../components/Authentication/shared/SuccessMessageScreen";
import { emailVerifySuccess } from "../../data/successMessages";
import FormContent from "../../components/Authentication/SignUp/FormContent";
import axios from "axios";

const SignUp = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [filteredSteps, setFilteredSteps] = useState(steps);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [prevFormData, setPrevFormData] = useState(null);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    fullname: "",
    role: "user",
    email: "",
    password: "",
    license: "",
    code: "",
  });

  useEffect(() => {
    const updatedSteps =
      formData.role === "user"
        ? steps.filter((step, index) => index !== 2)
        : steps;
    setFilteredSteps(updatedSteps);
  }, [formData.role]);

  const currentStep = stepIndex + 1;
  const currentFormData = filteredSteps[stepIndex];

  const nextStep = () => {
    setError({});
    if (currentStep < filteredSteps.length) {
      if (JSON.stringify(prevFormData) === JSON.stringify(formData)) {
        setError({});
        setStepIndex((prevIndex) => prevIndex + 1);
        return;
      }
      const validationPromises = currentFormData.fields.map((field) => {
        if (field.name !== "role") {
          return axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/validate/${field.name}`,
              {
                params: { [field.param]: formData[field.name] },
              }
            )
            .then(() => ({ [field.name]: null }))
            .catch((error) => ({
              [field.name]: error.response?.data || "Invalid input",
            }));
        }
        return Promise.resolve({});
      });

      Promise.all(validationPromises).then((results) => {
        const newErrors = results.reduce(
          (acc, error) => ({ ...acc, ...error }),
          {}
        );

        if (Object.values(newErrors).some((err) => err !== null)) {
          setError(newErrors);
        } else {
          setError({});
          setStepIndex((prevIndex) => prevIndex + 1);
        }
      });
    }
  };

  useEffect(() => {
    if (currentStep === filteredSteps.length) {
      if (JSON.stringify(prevFormData) === JSON.stringify(formData)) {
        return;
      }
      const registerUser = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
            {
              fullName: formData.fullname,
              email: formData.email,
              password: formData.password,
              role: formData.role.toUpperCase(),
              ...(formData.role === "consultant"
                ? { licenseNumber: formData.license }
                : {}),
            }
          );

          console.log("User registered successfully:", response.data);

          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/request-verification`,
            null,
            {
              params: { email: formData.email },
            }
          );

          console.log("Verification code sent.");
        } catch (error) {
          console.error(
            "Error during registration or verification:",
            error.response?.data || error.message
          );
        }
      };
      registerUser();
      setPrevFormData(formData);
    }
  }, [currentStep, filteredSteps.length, prevFormData, formData]);

  const prevStep = () => {
    if (currentStep > 1) {
      setStepIndex(stepIndex - 1);
    }
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (formData.email && formData.code) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
          email: formData.email,
          verificationCode: formData.code,
        })
        .then((response) => {
          setIsRegistrationComplete(true);
          setError({});
        })
        .catch((error) => {
          setError({
            code: error.response?.data || "Invalid verification code",
          });
        });
    }
  };

  const handleSelectRole = (e) => {
    const selectedOption = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      role: selectedOption,
    }));
  };

  const handleValueChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  if (isRegistrationComplete) {
    return (
      <SuccessMessageScreen
        title={emailVerifySuccess.title}
        message={emailVerifySuccess.message}
        buttonText={emailVerifySuccess.buttonText}
      />
    );
  }

  return (
    <SignUpWrapper>
      <ProgressBar step={currentStep} totalSteps={filteredSteps.length} />
      <StepNavigation
        resetKey={formData.role}
        resetRegistrationState={setIsRegistrationComplete}
        nextStep={nextStep}
        prevStep={prevStep}
        currentStep={currentStep}
      />
      <FormIntro
        title={currentFormData.title}
        description={currentFormData.description}
      />
      <FormContent
        submitForm={submitFormHandler}
        steps={steps}
        stepIndex={stepIndex}
        filteredSteps={filteredSteps}
        currentFormData={currentFormData}
        nextStep={nextStep}
        formData={formData}
        handleValueChange={handleValueChange}
        handleSelectRole={handleSelectRole}
        currentStep={currentStep}
        error={error}
      />
      {currentStep === 1 && (
        <>
          <div className="divider">Or</div>
          <SocialAuthOptions />
        </>
      )}
      <FormFooter action="Sign In" navigationLink="/auth">
        Have an account?
      </FormFooter>
    </SignUpWrapper>
  );
};

export default SignUp;

const SignUpWrapper = styled.div`
  .divider {
    text-align: center;
    color: var(--grey);
    margin-bottom: 24px;
    font-size: 12px;
  }
`;
