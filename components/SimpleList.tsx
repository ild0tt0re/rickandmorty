import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { ArrowRight } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 380,
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
    },
  })
)

export default function SimpleList() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <ArrowRight fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Status: " />
          Live
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <ArrowRight fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Species: " />
          Alien
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <ArrowRight fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Type: " />
          Monogatron
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <ArrowRight fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Gender: " />
          Male
        </ListItem>
      </List>
    </div>
  )
}
