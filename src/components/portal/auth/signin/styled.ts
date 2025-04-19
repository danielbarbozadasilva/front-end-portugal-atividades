import { Form } from "react-bootstrap";
import styled from "styled-components";

export const SFormSignIn = styled(Form)`
  background-color: #ffffff;
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
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SColFooter = styled.div`
  margin-top: 2rem;
  font-size: 0.95rem;
  text-align: center;
  color: #666;
`;

export const SButtonSignIn = styled.button`
  width: 100%;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
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
  }
`;

export const STextLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;
