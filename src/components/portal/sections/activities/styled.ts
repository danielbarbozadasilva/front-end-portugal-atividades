import styled from 'styled-components'

export const SectionTitle = styled.h1`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vibrant-dark);
  border-bottom: 2px solid black;
  padding-bottom: 2rem;
`

export const FilterContainer = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto 2rem auto;
`

export const FilterForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`

export const FilterInput = styled.input`
  flex: 1 1 200px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a8e8;
    box-shadow: 0 0 0 3px rgba(0, 168, 232, 0.2);
  }
`

export const FilterSelect = styled.select`
  flex: 1 1 200px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a8e8;
    box-shadow: 0 0 0 3px rgba(0, 168, 232, 0.2);
  }
`

export const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #00a8e8;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: '#00a8e8';
    transform: translateY(-2px);
  }
`

export const ActivitiesContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1250px;
`