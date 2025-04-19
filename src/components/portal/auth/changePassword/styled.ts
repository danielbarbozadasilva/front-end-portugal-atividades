import { Form } from "react-bootstrap";
import styled from "styled-components";

export const SFormRecovery = styled(Form)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

export const STextForm = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SButtonFormRecovery = styled.button`
  width: 100%;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background: #0056b3;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    background: #00408f;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;