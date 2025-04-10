import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import BreadcrumbNavigation from "../components/UI/BreadcrumbNavigation";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CreateCasePage = () => {
  const { data: userData } = useContext(UserContext);
  const navigate = useNavigate();

  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    caseTypeId: "",
    province: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const provinces = [
    "Ontario",
    "Quebec",
    "British Columbia",
    "Alberta",
    "Manitoba",
    "Saskatchewan",
    "Nova Scotia",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ];

  useEffect(() => {
    if (!userData?.id || userData.role !== "Consultant") return;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/rcics/hire-requests/${userData.id}`
      )
      .then((res) => {
        const accepted = res.data.filter((req) => req.status === "Accepted");
        setAcceptedUsers(accepted);
      })
      .catch((err) => console.error("Failed to fetch accepted users:", err));
  }, [userData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.caseTypeId || !formData.province) return;

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cases`, {
        ...formData,
        rcicId: userData.id,
      });
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Error creating case:", err);
    }
  };

  return (
    <PageWrapper>
      <BreadcrumbNavigation title="Create Case" />
      <FormWrapper onSubmit={handleSubmit}>
        <label>
          Select User:
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a user --</option>
            {acceptedUsers.map((u) => (
              <option key={u.userId} value={u.userId}>
                {u.userFullName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Case Type:
          <select
            name="caseTypeId"
            value={formData.caseTypeId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select case type --</option>
            <option value="12">Student Visa</option>
            <option value="2">Visitor Visa</option>
          </select>
        </label>

        <label>
          Province:
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          >
            <option value="">-- Select province --</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Create Case</button>
      </FormWrapper>

      {showSuccessModal && (
        <StatusMessage>
          <div>
            <h3>Case created successfully!</h3>
            <p>
              Your case has been created and saved. You can now view it in your
              case dashboard.
            </p>
            <SuccessBtn onClick={() => navigate("/")}>Go to Home</SuccessBtn>
          </div>
        </StatusMessage>
      )}
    </PageWrapper>
  );
};

export default CreateCasePage;

const PageWrapper = styled.div`
  padding: 38px 16px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 18px;
  max-width: 500px;
  margin-top: 24px;

  label {
    font-size: 15px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  select {
    padding: 8px;
    font-size: 15px;
    border-radius: 6px;
    border: 1px solid var(--grey);
    cursor: pointer;
  }

  button {
    outline: none;
    margin-top: 12px;
    padding: 10px 18px;
    background-color: var(--red);
    color: white;
    border: none;
    font-size: 17px;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const StatusMessage = styled.div`
  width: 100vw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 222;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background-color: var(--background);
    border-radius: 10px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;

    p {
      font-size: 14px;
      text-align: center;
      color: var(--grey);
      margin: 0;
    }

    h3 {
      margin: 0;
      font-size: 18px;
      color: var(--black);
    }
  }
`;

const SuccessBtn = styled.button`
  background-color: var(--red);
  color: white;
  border: none;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
`;
