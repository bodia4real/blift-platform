import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import avatar from "../../assets/avatar.svg";

const HireRequestsNotification = () => {
  const { data } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data?.id || data?.role !== "Consultant") return;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/rcics/hire-requests/${data.id}`
      )
      .then((res) => {
        const pendingOnly = res.data.filter((req) => req.status === "Pending");
        setRequests(pendingOnly);
      })
      .catch((err) => console.error("Failed to load requests:", err))
      .finally(() => setLoading(false));
  }, [data]);

  const handleRespond = async (id, action) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/rcics/hire/${id}/${action}`
      );
      setRequests((prev) => prev.filter((r) => r.requestId !== id));
    } catch (err) {
      console.error(`Failed to ${action} request:`, err);
    }
  };

  if (loading) return <p>Loading hire requests...</p>;
  if (requests.length === 0)
    return (
      <p style={{ textAlign: "center", color: "var(--grey)" }}>
        No pending hire requests.
      </p>
    );

  return (
    <>
      {requests.map((req) => (
        <RequestCard key={req.requestId}>
          <Left>
            <img src={avatar} alt={req.userFullName} />
          </Left>

          <Middle>
            <p>
              <strong>{req.userFullName}</strong> wants to hire you.
            </p>
            <Detail>
              <strong>Location:</strong> {req.location || "Not specified"}
            </Detail>
            <Detail>
              <strong>Region:</strong> {req.region || "Not specified"}
            </Detail>
            <Detail>
              <strong>Languages:</strong>{" "}
              {(req.languages || []).join(", ") || "Not specified"}
            </Detail>
          </Middle>

          <Right>
            <button onClick={() => handleRespond(req.requestId, "accept")}>
              Accept
            </button>
            <button onClick={() => handleRespond(req.requestId, "decline")}>
              Decline
            </button>
          </Right>
        </RequestCard>
      ))}
    </>
  );
};

export default HireRequestsNotification;

const RequestCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Left = styled.div`
  img {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    margin-right: 12px;
  }
`;

const Middle = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media screen and (min-width: 768px) {
    text-align: start;
    align-items: start;
    gap: 4px;
  }
`;

const Detail = styled.div`
  font-size: 14px;
  color: var(--grey);
`;

const Right = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 8px;

  button {
    padding: 8px 14px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: white;
  }

  button:first-child {
    background-color: rgb(41, 200, 76);
  }

  button:last-child {
    background-color: rgb(235, 64, 52);
  }

  @media screen and (min-width: 768px) {
    flex-direction: column;
    margin-top: 0px;
  }
`;
