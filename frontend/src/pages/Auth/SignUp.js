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

const SignUp = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [filteredSteps, setFilteredSteps] = useState(steps);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "user",
    email: "",
    password: "",
    number: "",
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
    if (currentStep < filteredSteps.length) {
      setStepIndex(stepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setStepIndex(stepIndex - 1);
    }
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    setIsRegistrationComplete(true);
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
      />
      {currentStep === 1 && (
        <>
          <div className="divider">Or</div>
          <SocialAuthOptions />
        </>
      )}
      <FormFooter
        question="Have an account?"
        action="Sign In"
        navigationLink="/auth"
      />
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
