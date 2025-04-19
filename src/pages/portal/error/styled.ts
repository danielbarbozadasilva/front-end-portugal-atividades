import { Form } from "react-bootstrap";
import styled from "styled-components";

export const SForm = styled(Form)`
  background-color: #fafafa;
  box-shadow: 0px 2px 15px 6px rgba(0, 0, 0, 0.11);
  padding: 100px;
  margin: 115px 0;
  max-width: 600px;
  margin: 115px auto;

  @media (max-width: 768px) {
    padding: 50px;
    margin: 50px 0;
  }

  @media (max-width: 576px) {
    padding: 20px;
    margin: 20px 0;
  }
`;

export const STextForm = styled.h2`
  line-height: 1.5;
  font-weight: 500;
  padding-left: 10px;
  border-left: 1px solid #484058;
  margin: 30px 0 50px 0;
`;