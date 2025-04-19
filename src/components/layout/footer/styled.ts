import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  padding: 6rem 0;
  background-color: var(--vibrant-light-gray);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: inline;
    margin: 0 0.5rem;

    a {
      color: var(--vibrant-gray);
      font-weight: 500;
      transition: color 0.2s ease-in-out;

      &:hover {
        color: var(--vibrant-primary);
      }
    }
  }
`;

export const FooterSocial = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: inline;
    margin: 0 0.5rem;

    a {
      color: var(--vibrant-gray);
      transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;

      &:hover {
        color: var(--vibrant-primary);
        transform: translateY(-2px);
      }
    }
  }
`;

export const FooterCopyright = styled.p`
  color: var(--vibrant-gray);
  font-size: 0.9rem;
`;