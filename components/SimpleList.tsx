import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { ArrowRight } from '@material-ui/icons'
import { info } from 'console'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
    },
    '@media screen and (min-width: 600px)': {
      width: 380,
    }
  })
)

export default function SimpleList({ items }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List component="nav" aria-label={items?.name}>
        {items?.map((item, index) => (
          <>
            <ListItem button>
              <ListItemText primary={item?.name} />
              {item?.value}
            </ListItem>
            {index < (items?.length-1) &&  <Divider />}
          </>
        ))}
      </List>
    </div>
  )
}
