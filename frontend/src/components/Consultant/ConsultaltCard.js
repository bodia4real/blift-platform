import React, { useState, useContext } from "react";
import styled from "styled-components";
import avatar from "../../assets/avatar.svg";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const ConsultantCard = ({ data, isPending }) => {
  const { data: userData } = useContext(UserContext);
  const [isHired, setIsHired] = useState(isPending);

  const handleHireClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/rcics/hire`,
        {
          userId: userData.id,
          rcicId: data.id,
        }
      );
      setIsHired(data.id);
      console.log("Hire request response:", response.data);
    } catch (error) {
      console.error("Failed to send hire request:", error);
    }
  };

  return (
    <Card>
      <TopSection>
        <Avatar src={data.profilePhoto || avatar} alt={data.fullName} />
        <Name>{data.fullName}</Name>
      </TopSection>

      <GroupSection>
        <InfoSection>
          <h4>Location</h4>
          <li>{data.location || "Not specified"}</li>
        </InfoSection>
        <InfoSection>
          <h4>Languages</h4>
          {Array.isArray(data.languages) && data.languages.length > 0 ? (
            data.languages.map((lang, index) => <li key={index}>{lang}</li>)
          ) : typeof data.languages === "string" &&
            data.languages.trim() !== "" ? (
            data.languages
              .split(",")
              .map((lang, index) => <li key={index}>{lang.trim()}</li>)
          ) : (
            <li>Not specified</li>
          )}
        </InfoSection>
        <InfoSection>
          <h4>Specialization</h4>
          <p>{data.specialization || "Not specified"}</p>
        </InfoSection>
        <InfoSection>
          <h4>Region</h4>
          <p>{data.region || "Not specified"}</p>
        </InfoSection>
      </GroupSection>

      <button
        disabled={isPending}
        onClick={handleHireClick}
        style={{
          background: isHired ? "rgb(190, 135, 47)" : "rgb(41, 200, 76)",
        }}
      >
        {isHired ? "Waiting approval" : "Hire"}
      </button>
    </Card>
  );
};

export default ConsultantCard;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 18px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  max-width: 100%;
  box-sizing: border-box;

  button {
    outline: none;
    display: block;
    border: none;
    width: 100%;
    text-align: center;
    padding: 8px;
    font-size: 15px;
    color: white;
    text-decoration: none;
    border-radius: 12px;
    background-color: rgb(41, 200, 76);

    &:hover {
      cursor: pointer;
      background-color: rgb(35, 175, 65);
    }
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  flex-wrap: wrap;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

const Name = styled.h3`
  font-size: 18px;
  font-weight: 700;
  word-break: break-word;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const GroupSection = styled.div`
  display: grid;
  padding: 12px;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;

  h4 {
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 600;
  }

  ul {
    color: var(--grey);
    margin: 0;
  }

  li {
    list-style-type: none;
    color: var(--grey);
  }

  p {
    margin: 0;
    color: var(--grey);
    word-break: break-word;
  }
`;
