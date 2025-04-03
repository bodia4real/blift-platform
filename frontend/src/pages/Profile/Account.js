import React from "react";
import styled from "styled-components";
import BreadcrumbNavigation from "../../components/UI/BreadcrumbNavigation";
import AccountInfo from "../../components/Profile/Account/AccountInfo";

const AccountPage = () => {
  return (
    <PageWrapper>
      <BreadcrumbNavigation title="Profile" />
      <AccountInfo />
    </PageWrapper>
  );
};

export default AccountPage;

const PageWrapper = styled.div`
  padding: 38px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;
