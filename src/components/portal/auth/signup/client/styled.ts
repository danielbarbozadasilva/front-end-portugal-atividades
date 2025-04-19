import { Form, Row } from "react-bootstrap";
import styled from "styled-components";

export const SFormSignUp = styled.form`
  background-color: #ffffff;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const STextForm = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333333;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SRow = styled(Row)`
  margin-bottom: 1rem;
`;

export const SFormGroup = styled(Form.Group)`
  margin-bottom: 1rem;

  label {
    font-weight: 600;
    color: #555555;
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
  background-color: #007bff;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 123, 255, 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.5);
    transform: translateY(-2px);
    cursor: pointer;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;