import styled from "styled-components";

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || "32px"};
`;

export default FieldsContainer;
