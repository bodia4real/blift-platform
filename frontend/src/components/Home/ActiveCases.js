import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const ActiveCases = () => {
  const { data } = useContext(UserContext);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data?.id) return;

    const endpoint =
      data.role === "Consultant"
        ? `/cases/rcic/${data.id}`
        : `/cases/user/${data.id}`;

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`)
      .then((res) => setCases(res.data))
      .catch((err) => console.error("Failed to fetch cases:", err))
      .finally(() => setLoading(false));
  }, [data]);

  if (loading) return <p>Loading cases...</p>;
  if (!cases.length) return <p>No active cases yet.</p>;

  return (
    <CaseList>
      {cases.map((c) => (
        <CaseCard key={c.id}>
          <Header>
            <h4>{c.caseTypeName}</h4>
            <Badge>{c.status}</Badge>
          </Header>
          <Info>
            <Group>
              <Label>Province</Label>
              <Value>{c.province}</Value>
            </Group>
            <Group>
              <Label>Date</Label>
              <Value>{new Date(c.date).toLocaleDateString()}</Value>
            </Group>
            <Group>
              <Label>
                {data.role === "Consultant" ? "User" : "Consultant"}
              </Label>
              <Value>
                {data.role === "Consultant" ? c.userName : c.rcicName}
              </Value>
            </Group>
          </Info>
        </CaseCard>
      ))}
    </CaseList>
  );
};

export default ActiveCases;

// Styled Components

const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CaseCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: var(--black);
    margin: 0;
  }
`;

const Badge = styled.span`
  background-color: var(--red);
  color: #fff;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 16px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;
`;

const Label = styled.span`
  font-size: 12px;
  color: var(--grey);
  margin-bottom: 2px;
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--black);
`;
