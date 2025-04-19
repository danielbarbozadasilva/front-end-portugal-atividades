import styled from 'styled-components'
import ImagHero from '../../../../assets/img/012lg.jpg'

export const SectionWrapper = styled.section`
  width: 100%;
  height: 70vh;
  position: relative;
  overflow: hidden;
  background: url(${ImagHero}) no-repeat center center;
  background-size: cover;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.vibrantDark};
  opacity: 0.5;
  z-index: 1;
`

export const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: 600;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: ${({ theme }) => theme.colors.vibrantAccent};
  @media(max-width: 768px) {
    font-size: 1.8rem;
  }
`

export const Lead = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: ${({ theme }) => theme.colors.vibrantAccent};
  @media(max-width: 768px) {
    font-size: 1rem;
    padding: 1rem;
  }
`

export const Button = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: rgb(29, 53, 87);
  background-color: ${({ theme }) => theme.colors.vibrantAccent};
  border-radius: 0.75rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out,
  box-shadow 0.3s ease-in-out;
  &:hover {
    background-color: '#ffffff';
    transform: scale(1.03);
    box-shadow: 0 8px 15px rgba(29, 53, 87, 0.3);
  }
`
