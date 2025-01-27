import styled, { css } from "styled-components";

const Button = styled.button`
  background-color: var(--red);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 24px;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  ${({ $primary }) =>
    $primary
      ? css`
          background-color: var(--red);
          color: var(--white);
          &:hover {
            background-color: var(--red-hovered);
          }
        `
      : css`
          background-color: var(--white);
          color: var(--black);
          border: 1px solid #a5a5a5;
          &:hover {
            background-color: var(--background);
          }
        `}
`;

export default Button;
