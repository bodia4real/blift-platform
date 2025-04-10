import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import ConsultantCard from "../Consultant/ConsultaltCard";
import { UserContext } from "../../context/UserContext";

const ConsultantCardContainer = () => {
  const { data: userData } = useContext(UserContext);
  const [consultants, setConsultants] = useState([]);
  const [pendingRcicIds, setPendingRcicIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const consultantsRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/rcics`
        );
        setConsultants(consultantsRes.data);

        if (userData) {
          const pendingRes = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/rcics/hire-requests/user/${userData.id}`
          );

          const pendingIds = pendingRes.data
            .filter((req) => req.status === "Pending")
            .map((req) => req.rcicId);

          setPendingRcicIds(pendingIds);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load consultants or pending requests:", err);
        setIsLoading(false);
      }
    };

    loadData();
  }, [userData]);

  if (isLoading) {
    return <p>Loading consultants...</p>;
  }

  return (
    <Container>
      {consultants.map((consultant) => (
        <ConsultantCard
          key={consultant.id}
          data={consultant}
          isPending={pendingRcicIds.includes(consultant.id)}
        />
      ))}
    </Container>
  );
};

export default ConsultantCardContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
