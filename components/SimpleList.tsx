import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
    },
    primary: {
      maxWidth: '50%',
    },
    '@media screen and (min-width: 600px)': {
      root: {
        width: 400,
      },
    },
  })
)

export default function SimpleList({ items }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List component="nav" aria-label={items?.name}>
        {items?.map((item, index) => (
          <div key={index}>
            <ListItem button>
              <ListItemText primary={<b>{item?.name}:</b>} className={classes.primary} />
              <ListItemText primary={item?.value} className={classes.primary} />
            </ListItem>
            {index < items?.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </div>
  )
}
