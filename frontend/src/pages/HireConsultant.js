import React from "react";
import styled from "styled-components";
import BreadcrumbNavigation from "../components/UI/BreadcrumbNavigation";
import ConsultantCardContainer from "../components/Consultant/ConsultaltCardContainer";

const HireConsultantPage = () => {
  return (
    <PageWrapper>
      <BreadcrumbNavigation title="Hire RCIC" />
      <ConsultantCardContainer />
    </PageWrapper>
  );
};

export default HireConsultantPage;

const PageWrapper = styled.div`
  padding: 38px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;
