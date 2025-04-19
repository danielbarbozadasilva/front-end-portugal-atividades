import { Form } from "react-bootstrap";
import styled from "styled-components";

export const SFormSignUp = styled(Form)`
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 900px; /* Ajuste conforme necessidade */
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
    transform: translateY(-2px);
  }
`;

export const SRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  & > * {
    flex: 1;
    min-width: 200px;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

export const SFormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
`;

export const STextForm = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #333;
`;

export const SButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #0062cc;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    background: #004a99;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;