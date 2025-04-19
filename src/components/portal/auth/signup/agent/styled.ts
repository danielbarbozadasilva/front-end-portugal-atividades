import { Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

export const SFormSignUp = styled(Form)`
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 2rem;
  max-width: 900px;
  margin: 2rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const SRow = styled(Row)`
  margin-bottom: 1rem;
`;

export const SFormGroup = styled(Form.Group)`
  margin-bottom: 1rem;
  .form-control {
    transition: box-shadow 0.2s ease;
    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(45, 120, 232, 0.25);
      border-color: #2d78e8;
    }
  }
`;

export const STextForm = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
`;

export const SButton = styled.button`
  background-color: #2d78e8;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  outline: none;

  &:hover {
    background-color: #1e5bbf;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #1750a1;
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;