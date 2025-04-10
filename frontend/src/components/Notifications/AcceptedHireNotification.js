import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";

const AcceptedHireNotification = () => {
  const { data } = useContext(UserContext);
  const [acceptedMessages, setAcceptedMessages] = useState([]);

  useEffect(() => {
    if (!data?.id) return;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/rcics/hire-requests/user/${data.id}`
      )
      .then((res) => {
        const seen = JSON.parse(localStorage.getItem("readHireMessages")) || [];
        const accepted = res.data.filter(
          (req) => req.status === "Accepted" && !seen.includes(req.requestId)
        );
        setAcceptedMessages(accepted);
      })
      .catch((err) =>
        console.error("Failed to fetch accepted hire requests", err)
      );
  }, [data]);

  const dismissNotification = (requestId) => {
    const seen = JSON.parse(localStorage.getItem("readHireMessages")) || [];
    localStorage.setItem(
      "readHireMessages",
      JSON.stringify([...seen, requestId])
    );
    setAcceptedMessages((prev) =>
      prev.filter((msg) => msg.requestId !== requestId)
    );
  };

  if (acceptedMessages.length === 0)
    return (
      <p style={{ textAlign: "center", color: "var(--grey)" }}>
        No pending hire requests.
      </p>
    );

  return (
    <Wrapper>
      {acceptedMessages.map((msg) => (
        <NotificationCard
          key={msg.requestId}
          onClick={() => dismissNotification(msg.requestId)}
        >
          <p>
            <strong>{msg.rcicFullName}</strong> has accepted your hire request!
          </p>
        </NotificationCard>
      ))}
    </Wrapper>
  );
};

export default AcceptedHireNotification;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NotificationCard = styled.div`
  background-color: #e9f9e9;
  border-left: 5px solid rgb(41, 200, 76);
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #dff4df;
  }

  p {
    margin: 0;
    color: var(--black);
  }

  strong {
    color: var(--green-dark);
  }
`;
