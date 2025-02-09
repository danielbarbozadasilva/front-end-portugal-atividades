import styled from 'styled-components'

export const SContainerTitle = styled.div`
  width: 100%;
  top: 10%;
  position: absolute;
  z-index: 100;
  @media (max-width: 805px) {
    top: 5%;
  }
`

export const STextTitle = styled.div`
  word-wrap: break-word;
  color: #ebebeb;
  text-align: center;
`

export const STextCaption = styled.div`
  font-weight: 500;
  word-wrap: break-word;
  color: #ebebeb;
  text-align: center;
  padding-top: 0.5%;
`

export const SContainerAbout = styled.div`
  display: block;
  position: relative;
  padding-bottom: 5%;
  width: 100%;
  text-align: center;
  justify-content:center;
  align-itens: center;
  background-color: #f8f8f8;
  @media screen and (max-width: 1140px) {
    padding-top: 40px;
    padding-bottom: 15%;
  }
`

export const STitleAbout = styled.h2`
  line-height: 1.5;
  font-weight: 900;
  padding-top: 5%;
  color: #473F57;
  @media (max-width: 555px) {
    padding-left: 0px;
  }
`

export const SubTitleAbout = styled.h4`
  line-height: 1.5;
  font-weight: 500;
  padding-left: 10px;
  margin: 30px 0px 50px 5px;
  color: #473F57;
  @media (max-width: 555px) {
    margin: 30px 0px 50px 15px;
    padding-left: 0px;
    margin: 30px 0px 50px 0px;
  }
`

export const styles: any = {
  container: {
    padding: '20px'
  },
  filterForm: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    padding: '8px',
    fontSize: '14px'
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  activitiesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px'
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '300px',
    overflow: 'hidden',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  cardBody: {
    padding: '10px'
  },
  pagination: {
    marginTop: '20px'
  },
  pageButton: {
    margin: '0 5px',
    padding: '5px 10px'
  }
}

