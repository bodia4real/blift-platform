import React from "react";
import styled from "styled-components";
import BreadcrumbNavigation from "../../components/UI/BreadcrumbNavigation";
import EditAccount from "../../components/Profile/Account/EditAccount";

const AccountPage = () => {
  return (
    <PageWrapper>
      <BreadcrumbNavigation title="Edit Profile" />
      <EditAccount />
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
