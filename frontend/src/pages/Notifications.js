import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import HireRequestsNotification from "../components/Notifications/HireRequestsNotification";
import BreadcrumbNavigation from "../components/UI/BreadcrumbNavigation";
import AcceptedHireNotification from "../components/Notifications/AcceptedHireNotification";

const NotificationsPage = () => {
  const { data } = useContext(UserContext);

  return (
    <PageWrapper>
      <BreadcrumbNavigation title="Notifications" />
      {data?.role === "Consultant" && <HireRequestsNotification />}
      {data?.role === "User" && <AcceptedHireNotification />}
    </PageWrapper>
  );
};

export default NotificationsPage;

const PageWrapper = styled.div`
  padding: 38px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;
