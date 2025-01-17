import React from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import googleIcon from "../../../assets/google.svg";
import facebookIcon from "../../../assets/facebook.svg";

const socialAuthOptions = [
  {
    id: "socialBtn-1",
    title: "Continue with Google",
    alt: "Google Icon",
    src: googleIcon,
  },
  {
    id: "socialBtn-2",
    title: "Continue with Facebook",
    alt: "Facebook Icon",
    src: facebookIcon,
  },
];

const SocialAuthOptions = () => {
  return (
    <OptionsList>
      {socialAuthOptions.map((option) => (
        <li key={option.id}>
          <Button>
            <Icon src={option.src} alt={option.alt} />
            {option.title}
          </Button>
        </li>
      ))}
    </OptionsList>
  );
};

const OptionsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
  li {
    list-style-type: none;
  }
`;

const Icon = styled.img`
  margin-right: 8px;
`;

export default SocialAuthOptions;
