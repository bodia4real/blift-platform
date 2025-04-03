import React from "react";
import { moreOptionsData } from "../../data/profileOptions";
import OptionsWrapper from "./OptionsWrapper";
import ProfileOption from "./ProfileOption";

const MoreProfileOptions = () => {
  return (
    <OptionsWrapper>
      <ul>
        {moreOptionsData.map((option) => (
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

export default MoreProfileOptions;
