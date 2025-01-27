import React from "react";
import styled from "styled-components";

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;
  return (
    <Wrapper>
      <StepText>
        Step {step} of {totalSteps}
      </StepText>
      <BarContainer>
        <Progress style={{ width: `${progress}%` }} />
      </BarContainer>
    </Wrapper>
  );
};

export default ProgressBar;

const Wrapper = styled.div`
  width: 100%;
`;

const StepText = styled.div`
  margin-bottom: 16px;
  font-size: 12px;
  color: var(--grey);
`;

const BarContainer = styled.div`
  height: 8px;
  width: 100%;
  border: 1px solid rgba(228, 42, 42, 0.81);
  border-radius: 4px;
`;

const Progress = styled.div`
  height: 100%;
  border-radius: 4px;
  background-color: var(--red);
  transition: all 0.35s ease-in-out;
`;
