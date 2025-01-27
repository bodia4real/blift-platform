import React, { useEffect, useState } from "react";
import styled from "styled-components";
import arrowLeft from "../../../assets/arrow-left.svg";
import arrowRight from "../../../assets/arrow-right.svg";

const StepNavigation = ({
  currentStep,
  nextStep,
  prevStep,
  resetKey,
  resetRegistrationState,
}) => {
  const [completedSteps, setCompletedSteps] = useState([1]);

  useEffect(() => {
    setCompletedSteps([1]);
    resetRegistrationState(false);
  }, [resetKey, resetRegistrationState]);

  useEffect(() => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prevStep) => [...prevStep, currentStep]);
    }
  }, [currentStep, completedSteps]);

  const isPrevStepAvailable = currentStep > 1;
  const isNextStepAvailable = completedSteps.includes(currentStep + 1);

  return (
    <Navigation>
      <Button onClick={prevStep} disabled={!isPrevStepAvailable}>
        <IconWrapper>
          <Icon
            src={arrowLeft}
            alt="Arrow Left"
            $disable={!isPrevStepAvailable}
          />
        </IconWrapper>
        Prev
      </Button>
      <Button onClick={nextStep} disabled={!isNextStepAvailable}>
        Next
        <IconWrapper>
          <Icon
            src={arrowRight}
            alt="Arrow Right"
            $disable={!isNextStepAvailable}
          />
        </IconWrapper>
      </Button>
    </Navigation>
  );
};

export default StepNavigation;

const Navigation = styled.nav`
  margin-top: 8px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  color: var(--black);
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  &:disabled {
    cursor: initial;
    opacity: 0.5;
  }
`;

const IconWrapper = styled.span`
  padding-top: 2px;
`;

const Icon = styled.img`
  opacity: ${({ $disabled }) => ($disabled ? "0.5" : "1")};
`;
