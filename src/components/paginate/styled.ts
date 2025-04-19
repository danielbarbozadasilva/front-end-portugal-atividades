export const styles = {
  card: {
    margin: '1rem',
    border: '1px solid #ddd',
    borderRadius: '0.5rem',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  cardBody: {
    padding: '1rem'
  },
  container: {
    padding: '2rem'
  },
  filterForm: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    marginBottom: '2rem'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem'
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  activitiesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem'
  },
  pageButton: {
    margin: '0 0.25rem',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

