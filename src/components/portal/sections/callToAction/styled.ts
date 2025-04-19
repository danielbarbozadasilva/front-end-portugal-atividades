import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export const SectionWrapper = styled.section`
  text-align: center;
  color: var(--vibrant-accent);
  padding: 12rem 0 10rem;
  position: relative;
  overflow: hidden;
  background: url('/assets/img/bg-sobre-portugal-vibrant.jpg') no-repeat center center;
  background-size: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--vibrant-dark);
  opacity: 0.5;
`;

export const CTAContainer = styled(Container)`
  position: relative;
  z-index: 2;
`;

export const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
`;

export const Lead = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
`;