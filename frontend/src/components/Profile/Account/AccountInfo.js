import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/UserContext";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";
import avatar from "../../../assets/avatar.svg";
import axios from "axios";

const AccountInfo = () => {
  const { data } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!data) return;

    const endpoint =
      data.role === "User"
        ? `/profile/user/${data.id}`
        : `/profile/consultant/${data.id}`;

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Profile fetch failed:", err));
  }, [data]);

  if (!data || !profile) {
    return (
      <li
        style={{ textAlign: "center", padding: "26px", listStyleType: "none" }}
      >
        Loading...
      </li>
    );
  }
  console.log(profile);

  return (
    <Wrapper>
      <InfoContainer>
        <MainInfoContainer>
          <Avatar src={avatar} alt="User Avatar" />
          <UserInfo>
            <h3>{profile.fullName}</h3>
            <span>{profile.role}</span>
          </UserInfo>
        </MainInfoContainer>

        <DetailedInfoContainer>
          <InfoGroup>
            <InfoBlock>
              <h4>Location</h4>
              <p>{profile.location || "Not specified"}</p>
            </InfoBlock>
            <InfoBlock>
              <h4>Languages</h4>
              <p>{profile.languages || "Not specified"}</p>
            </InfoBlock>
            <InfoBlock>
              <h4>Region</h4>
              <p>{profile.region || "Not specified"}</p>
            </InfoBlock>
            {data.role === "Consultant" && (
              <InfoBlock>
                <h4>Specialization</h4>
                <p>{profile?.specialization || "Not specified"}</p>
              </InfoBlock>
            )}
          </InfoGroup>
        </DetailedInfoContainer>
      </InfoContainer>

      <StyledLink to="/profile/edit-profile">Edit Profile</StyledLink>
    </Wrapper>
  );
};

export default AccountInfo;

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    background-color: white;
    border-radius: 6px;
    padding: 40px 32px;
  }
`;

const InfoContainer = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    column-gap: 32px;
  }
`;

const MainInfoContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 32px;
  margin-bottom: 28px;

  @media screen and (min-width: 768px) {
    flex: 1.5;
  }

  @media screen and (min-width: 1080px) {
    column-gap: 48px;
  }
`;

const Avatar = styled.img`
  width: 85px;
  display: block;
  height: 85px;

  @media screen and (min-width: 768px) {
    width: 170px;
    height: 170px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 8px;
  }

  span {
    color: var(--grey);
    font-size: 16px;
    font-weight: 500;
  }
`;

const DetailedInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 28px;
  margin-bottom: 36px;
  @media screen and (min-width: 768px) {
    flex: 2;
  }
`;

const InfoGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const InfoBlock = styled.article`
  h4 {
    color: var(--black);
    font-size: 16px;
  }
  p {
    color: var(--grey);
    font-size: 16px;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  border: none;
  width: 100%;
  text-align: center;
  padding: 12px;
  font-size: 15px;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  background-color: rgb(235, 64, 52);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(200, 50, 40);
    cursor: pointer;
  }
`;
