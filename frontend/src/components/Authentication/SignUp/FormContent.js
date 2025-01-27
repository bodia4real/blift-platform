import React from "react";
import styled from "styled-components";
import FieldsContainer from "../../../components/UI/FieldsContainer";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import Select from "../../../components/UI/Select";
import ResendEmail from "../shared/ResendEmail";

const FormContent = ({
  submitForm,
  steps,
  stepIndex,
  filteredSteps,
  formData,
  currentFormData,
  nextStep,
  handleValueChange,
  handleSelectRole,
  currentStep,
}) => {
  return (
    <Form onSubmit={submitForm}>
      <FieldsContainer
        $marginBottom={stepIndex === filteredSteps.length - 1 ? "24px" : null}
      >
        {currentFormData.fields.map((field) =>
          field.type !== "select" ? (
            <Input
              key={field.id}
              label={field.label}
              type={field.type}
              name={field.name}
              maxLength={field.maxLength}
              value={formData[field.name]}
              onValueChange={handleValueChange}
              required
            />
          ) : (
            <Select
              value={formData.role}
              key={field.id}
              options={field.options}
              label={field.label}
              name={field.name}
              onChange={handleSelectRole}
            />
          )
        )}
      </FieldsContainer>
      {stepIndex === filteredSteps.length - 1 && <ResendEmail />}
      <Button $primary onClick={nextStep}>
        {steps.length === currentStep ? "Complete Registration" : "Next Step"}
      </Button>
    </Form>
  );
};

export default FormContent;

const Form = styled.form`
  margin-bottom: 24px;
`;
