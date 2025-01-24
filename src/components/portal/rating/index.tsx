import React from 'react'
import { Card } from '@mui/material'
import { CardContent } from '@mui/material'
import { Typography } from '@mui/material'
import { RiChatQuoteFill } from 'react-icons/ri'
import { SRating } from './styled'
import { IProps } from './types'
import { useStyles } from './form/styled'

const Reviews: React.FC<IProps> = ({ data }) => {
  const classes = useStyles()

  return (
    <>
      {data?.length ? (
        <Card className={classes.root}>
          {data?.map((item, index) => (
            <div key={index} className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <RiChatQuoteFill />
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  {item.name}
                </Typography>
                <Typography className={classes.text} color="textSecondary">
                  {item.text}
                </Typography>
                <Typography className={classes.text} color="textSecondary">
                  <SRating
                    name="simple-controlled"
                    readOnly={true}
                    value={item.score}
                  />
                </Typography>
              </CardContent>
            </div>
          ))}
        </Card>
      ) : (
        <h6>Nenhuma avaliação</h6>
      )}
    </>
  )
}

export default Reviews
