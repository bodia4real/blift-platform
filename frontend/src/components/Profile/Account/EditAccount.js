import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/UserContext";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditAccount = () => {
  const navigate = useNavigate();
  const { data } = useContext(UserContext);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!data) return;

    const endpoint =
      data.role === "User"
        ? `/profile/user/${data.id}`
        : `/profile/consultant/${data.id}`;

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`)
      .then((res) => {
        setFormData({
          fullName: res.data.fullName || "",
          specialization: res.data.specialization || "",
          location: res.data.location || "",
          languages: res.data.languages || "",
          region: res.data.region || "",
        });
      })
      .catch((err) => console.error("Profile fetch failed:", err));
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData || !data) return;

    const endpoint =
      data.role === "User"
        ? `/profile/user/${data.id}`
        : `/profile/consultant/${data.id}`;

    const payload = {
      fullName: formData.fullName,
      location: formData.location,
      region: formData.region || "",
      languages: formData.languages,
      specialization: formData.specialization,
    };

    if (data.role === "User") {
      payload.profile_picture = data.profile_picture || "";
    } else if (data.role === "Consultant") {
      payload.profilePhoto = data.profilePhoto || "";
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
        payload
      );
      navigate("/profile/account");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>

      <label>
        Languages:
        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
        />
      </label>

      <label>
        Region:
        <input
          type="text"
          name="region"
          value={formData.region}
          onChange={handleChange}
        />
      </label>

      {data.role === "Consultant" && (
        <label>
          Specialization:
          <input
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
        </label>
      )}

      <Button $primary>Save Changes</Button>
    </FormWrapper>
  );
};

export default EditAccount;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  label {
    font-weight: 600;
    color: var(--black);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  input,
  textarea {
    padding: 8px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;
