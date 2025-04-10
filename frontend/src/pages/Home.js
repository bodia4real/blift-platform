import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ActiveCases from "../components/Home/ActiveCases";

const HomePage = () => {
  const { data } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!data?.id || data?.role !== "Consultant") return;
    console.log(data);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/rcics/hire-requests/${data.id}`
      )
      .then((res) => {
        const pendingOnly = res.data.filter((req) => req.status === "Pending");
        setMessages(pendingOnly);
      })
      .catch((err) => console.error("Failed to load requests:", err));
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

  function clickMessageHandler() {
    navigate("/notifications");
  }

  return (
    <PageWrapper>
      <Section>
        <h2>My Blift portal account</h2>
        <div className="line" />
        <p>
          You are signed in as <span>{data.fullName}</span>
        </p>
      </Section>

      <Section>
        <h2>Your Active Cases</h2>
        <p>
          View and manage your ongoing applications. Track the status, review
          important details, and complete any pending actions.
        </p>
        <ActiveCases />
      </Section>

      <Section>
        <h2>Messages Center</h2>
        {messages.length > 0 ? (
          <MessageList>
            {messages.map((msg) => (
              <MessageCard key={msg.requestId} onClick={clickMessageHandler}>
                <div>
                  <strong>{msg.userFullName}</strong> wants to hire you.
                </div>
                <div className="action">Click to see details</div>
              </MessageCard>
            ))}
          </MessageList>
        ) : (
          <p className="highlighted">You have no messages.</p>
        )}
      </Section>
    </PageWrapper>
  );
};

export default HomePage;

const PageWrapper = styled.div`
  padding: 38px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;

const Section = styled.section`
  h2 {
    font-size: 24px;
    color: var(--black);
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    color: var(--grey);
    margin-bottom: 24px;
  }

  p > span {
    color: var(--red);
    font-weight: 700;
  }

  .line {
    border-top: 1px solid var(--red);
    margin-bottom: 12px;
  }

  .highlighted {
    color: var(--red);
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageCard = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-left: 4px solid var(--red);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08);

  .action {
    color: var(--red);
  }

  &:hover {
    cursor: pointer;
  }
`;
