import ListItem from '@mui/material/ListItem'
import styled from 'styled-components'

export const SListItemIcon = styled(ListItem)`
  color: #aab4c1 !important;
`
export const SListItemText = styled(ListItem)`
  color: #aab4c1;
  &:hover {
    text-decoration: underline;
    color: #aab4c1;
    transition: 0.5s ease-out;
  }
`
