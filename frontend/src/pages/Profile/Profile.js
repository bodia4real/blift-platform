import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import BreadcrumbNavigation from "../../components/UI/BreadcrumbNavigation";
import avatar from "../../assets/avatar.svg";
import ProfileOptions from "../../components/Profile/ProfileOptions";
import MoreProfileOptions from "../../components/Profile/MoreProfileOptions";
import { UserContext } from "../../context/UserContext";

const ProfilePage = () => {
  const { data } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
      <li
        style={{ textAlign: "center", padding: "26px", listStyleType: "none" }}
      >
        Loading...
      </li>
    );
  }

  return (
    <PageWrapper>
      <BreadcrumbNavigation title="Profile" />
      <ProfileInfo>
        <InfoContainer>
          <AvatarWrapper>
            <img src={avatar} alt="Default Avatar" />
          </AvatarWrapper>
          <div>
            <h3>{data.fullName}</h3>
            <p>{data.role}</p>
          </div>
        </InfoContainer>
      </ProfileInfo>
      <ProfileOptions />
      <h3>More</h3>
      <MoreProfileOptions />
    </PageWrapper>
  );
};

export default ProfilePage;

const PageWrapper = styled.div`
  padding: 38px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;

const ProfileInfo = styled.div`
  background-color: var(--red);
  border-radius: 6px;
  height: 100px;
  padding: 16px;
  display: flex;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  column-gap: 12px;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
      color: var(--white);
    }

    p {
      color: #d7d7d7;
    }
  }
`;

const AvatarWrapper = styled.div`
  background-color: var(--white);
  border-radius: 50%;
  height: 64px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
