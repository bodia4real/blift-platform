import React from "react";
import styled from "styled-components";
import arrowRight from "../../assets/arrow-right.svg";
import { useNavigate } from "react-router-dom";

const ProfileOption = ({
  title,
  description,
  iconSrc,
  iconAlt,
  navigateTo,
}) => {
  const navigate = useNavigate();

  function navigateHandler() {
    if (navigateTo) {
      if (navigateTo === "/auth") {
        localStorage.removeItem("login");
      }
      navigate(navigateTo);
    }
  }

  return (
    <Option onClick={navigateHandler}>
      <InnerContainer>
        <IconWrapper>
          <img src={iconSrc} alt={iconAlt} />
        </IconWrapper>

        <div>
          <h4>{title}</h4>
          {description && (
            <span className="option-description">{description}</span>
          )}
        </div>
      </InnerContainer>

      <img src={arrowRight} alt="Arrow Right" className="arrow" />
    </Option>
  );
};

export default ProfileOption;

const Option = styled.li`
  padding: 12px;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: rgba(239, 239, 239, 0.69);
  }

  .arrow {
    height: 25px;
    width: 28px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 18px;

  h4 {
    font-size: 16px;
    font-weight: 500;
  }

  .option-description {
    font-size: 14px;
    color: #ababab;
    margin-top: 4px;
  }
`;

const IconWrapper = styled.div`
  background-color: rgba(217, 83, 79, 0.1);
  border-radius: 50%;
  height: 45px;
  min-width: 45px;
  display: grid;
  place-items: center;
`;
