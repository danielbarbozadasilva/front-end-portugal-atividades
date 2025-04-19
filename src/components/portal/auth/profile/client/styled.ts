import { Form, Row } from "react-bootstrap";
import styled from "styled-components";

export const SFormSignUp = styled(Form)`
  width: 85%;
  margin: 80px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 14px 4px rgba(0, 0, 0, 0.15);
  padding: 40px;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 990px) {
    width: 95%;
    margin: 20px auto;
    padding: 20px;
  }
`;

export const STextForm = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #484058;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-left: 4px solid #484058;
  padding-left: 10px;
`;

export const SRow = styled(Row)`
  margin-bottom: 1rem;
`;

export const SFormGroup = styled(Form.Group)`
  margin-bottom: 1rem;

  label {
    font-weight: 600;
    color: #333;
  }

  input,
  select {
    border-radius: 4px;
    border: 1px solid #ccc;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
`;

export const SButton = styled.button`
  background-color: #484058;
  color: #fff;
  font-size: 16px;
  border: 1px solid #484058;
  padding: 8px 30px;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #3a304a;
    transform: translateY(-2px);
    cursor: pointer;
  }

  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;
