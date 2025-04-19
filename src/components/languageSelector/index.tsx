import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

interface Props {}

const LanguageSelector: React.FC<Props> = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <StyledSelectContainer>
      <Form.Select onChange={handleLanguageChange} defaultValue="en-US" >
        <option value="pt-BR">Português (Brasil)</option>
        <option value="pt-PT">Português (Portugal)</option>
        <option value="en-US">English (US)</option>
        <option value="es-ES">Español (España)</option>
        <option value="fr-FR">Français (France)</option>
      </Form.Select>
    </StyledSelectContainer>
  );
};

const StyledSelectContainer = styled.div`
  .form-select {
    border-radius: 0.375rem; /* Example: Use Bootstrap default, or customize */
    border-color: #ced4da; /* Example: Bootstrap default, or your theme */
    color: #495057;        /* Example: Bootstrap default, or your theme */
    padding: 0.375rem 1.75rem 0.375rem 0.75rem; /* Example spacing, adjust as needed */
    background-color: #fff;
    font-size: 1rem;       /* Or use a theme variable */
     &:focus {
        border-color: #86b7fe;  /* Bootstrap's focus color, or customize */
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); /* Example: Bootstrap-like focus */
    }
  }

   /* Add media queries for responsiveness if needed */
   @media (max-width: 768px) {  /* Example breakpoint */
      .form-select{
        width: 100%; /* Adjust width on smaller screens if needed */
      }
    }
`;



export default LanguageSelector;