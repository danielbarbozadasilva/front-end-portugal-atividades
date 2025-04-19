import { Button, Card } from "react-bootstrap"
import styled from "styled-components"

export const SectionWrapper = styled.section`
  padding: 8rem 0;
`

export const SectionTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 700;
  color: var(--vibrant-dark);
  margin-bottom: 3rem;
  text-align: center;
`

export const StyledCard = styled(Card)`
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  height: 100%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`

export const CardImg = styled(Card.Img)`
  height: 250px;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
`

export const CardBody = styled(Card.Body)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`

export const CardTitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vibrant-dark);
  margin-bottom: 1rem;
`

export const CardText = styled(Card.Text)`
  color: var(--vibrant-gray);
  font-size: 1.1rem;
  flex-grow: 1;
`

export const CardButton = styled(Button)`
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  font-weight: 600;
  background-color: var(--vibrant-primary);
  color: var(--vibrant-accent);
  border: none;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`
