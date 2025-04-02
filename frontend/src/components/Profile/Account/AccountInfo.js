import React from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import avatar from "../../../assets/avatar.svg";

const AccountInfo = () => {
  return (
    <Wrapper>
      <InfoContainer>
        <MainInfoContainer>
          <Avatar src={avatar} alt="User Avatar" />
          <UserInfo>
            <h3>John Benjamin</h3>
            <span>User</span>
          </UserInfo>
        </MainInfoContainer>

        <DetailedInfoContainer>
          <InfoGroup>
            <InfoBlock>
              <h4>Location</h4>
              <p>England, London</p>
            </InfoBlock>
            <InfoBlock>
              <h4>Languages</h4>
              <p>English, French</p>
            </InfoBlock>
          </InfoGroup>
          <InfoGroup>
            <InfoBlock>
              <h4>Description</h4>
              <p>
                Aspiring student moving to Ontario. Passionate about learning,
                exploring new opportunities, and building a future in Canada.
              </p>
            </InfoBlock>
          </InfoGroup>
        </DetailedInfoContainer>
      </InfoContainer>

      <Button $primary>Edit Profile</Button>
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
  display: flex;
  justify-content: space-between;

  & > article:nth-child(2) {
    padding-right: 24%;
  }
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
