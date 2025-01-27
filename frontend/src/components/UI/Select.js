import React from "react";
import styled from "styled-components";
import arrowDown from "../../assets/arrow-down.svg";

const Select = ({ label, options, name, onChange, value }) => {
  return (
    <SelectWrapper>
      <label htmlFor={name}>{label}</label>
      <div>
        <select id={name} name={name} onChange={onChange} value={value}>
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
        <img src={arrowDown} alt="Arrow down" />
      </div>
    </SelectWrapper>
  );
};

export default Select;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    color: var(--grey);
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 4px;
  }

  div {
    position: relative;
    width: 100%;

    select {
      cursor: pointer;
      width: 100%;
      height: 46px;
      background-color: var(--white);
      border: 1px solid #edf1f3;
      border-radius: 10px;
      color: var(--black);
      padding: 12px 14px;
      outline: none;
      font-size: 14px;
      appearance: none;
    }

    img {
      position: absolute;
      top: 45%;
      right: 14px;
      pointer-events: none;
    }

    @media (min-width: 768px) {
      select {
        border: 1px solid #c8cbcc;
      }
    }
  }
`;
