import React from "react";
import { optionsData } from "../../data/profileOptions";
import ProfileOption from "./ProfileOption";
import OptionsWrapper from "./OptionsWrapper";

const ProfileOptions = () => {
  return (
    <OptionsWrapper>
      <ul>
        {optionsData.map((option) => (
          <ProfileOption
            key={option.title}
            title={option.title}
            description={option.description}
            iconSrc={option.iconSrc}
            iconAlt={option.iconAlt}
            navigateTo={option.navigateTo}
          />
        ))}
      </ul>
    </OptionsWrapper>
  );
};

export default ProfileOptions;
