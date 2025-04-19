import { Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { ShowcaseItemProps } from "./types";

export const ShowcaseWrapper = styled.section`
  padding: 5rem 0;
`;

export const ShowcaseRow = styled(Row)`
  margin-top: 5%;
`;

export const ShowcaseImg = styled(Col)<ShowcaseItemProps>`
  background-image: url(${props => props.bgImage});
  height: 50vh!important;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ShowcaseText = styled(Col)`
  display: flex;
  align-items: center;
  padding: 4rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0.75rem;
`;

export const ShowcaseTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vibrant-dark);
  margin-bottom: 1.5rem;
`;

export const ShowcaseLead = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--vibrant-gray);
`;

export const ShowcaseButton = styled(Button)`
  border-color: var(--vibrant-primary);
  color: var(--vibrant-primary);
  font-weight: 600;
  border-width: 2px;
  padding: 0.8rem 1.8rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--vibrant-accent);
    transform: scale(1.02);
  }
`;