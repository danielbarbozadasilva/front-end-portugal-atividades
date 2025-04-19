import styled from "styled-components";

export const SectionWrapper = styled.section`
  padding: 8rem 0;
  background-color: var(--vibrant-light-gray);
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 700;
  color: var(--vibrant-dark);
  margin-bottom: 3rem;
`;

export const SectionLead = styled.p`
  font-size: 1.3rem;
  color: var(--vibrant-gray);
  margin-bottom: 4rem;
`;

export const TestimonialItem = styled.div`
  max-width: 22rem;
  padding: 2rem;
  background-color: var(--vibrant-accent);
  border-radius: 0.75rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

export const TestimonialImage = styled.img`
  max-width: 15rem;
  height: 13rem;
  border-radius: 10%;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  border: 5px solid var(--vibrant-accent);
`;

export const TestimonialName = styled.h5`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vibrant-dark);
  margin-bottom: 0.5rem;
`;

export const TestimonialText = styled.p`
  font-style: italic;
  color: var(--vibrant-gray);
  font-size: 1.1rem;
`;