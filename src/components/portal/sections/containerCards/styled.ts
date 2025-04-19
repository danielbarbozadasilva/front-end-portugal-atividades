import { Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

export const ShowcaseWrapper = styled(Col)`
  display: inline-block;
  width: 25%;
  margin: 0 auto;
  font-size: 1rem;
`

export const ShowcaseRow = styled(Row)`
  margin: 5%;
`

export const ShowcaseImg = styled(Col)`
  min-height: auto;
  background-size: cover;
  background-position: center;
  position: relative;
`

export const ShowcaseText = styled(Col)`
  display: flex;
  align-items: center;
  padding: 4rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
`

export const ShowcaseTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.vibrantDark || '#1d3557'};
  margin-bottom: 1rem;
  letter-spacing: 0.05rem;
`

export const ShowcaseLead = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.vibrantGray || '#6c757d'};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

export const ShowcaseButton = styled(Button)`
  border-color: ${({ theme }) => theme.colors.vibrantPrimary || '#00a8e8'};
  color: ${({ theme }) => theme.colors.vibrantPrimary || '#00a8e8'};
  font-weight: 600;
  border-width: 2px;
  padding: 0.8rem 1.8rem;
  border-radius: 0.5rem;
  background: transparent;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.vibrantPrimary || '#00a8e8'};
    color: ${({ theme }) => theme.colors.vibrantAccent || '#ffffff'};
    transform: scale(1.05);
  }
`
