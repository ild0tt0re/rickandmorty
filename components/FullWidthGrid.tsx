import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    image: {
      height: '100%',
      width: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
)

export default function FullWidthGrid({ items = [], handleDialogOpen }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  function extractLocationIds(item) {
    const location = item.location.url.split('api/location/')[1]
    const origin = item.origin.url.split('api/location/')[1]

    const locationIds = [location]
    origin && origin !== location ? locationIds.push(origin) : null
    return locationIds
  }

  function extractEpisodeIds(item) {
    const episodeIds = []
    for (const iEpisode of item.episode) {
      const episodeId = iEpisode.split('api/episode/')[1]
      episodeIds.push(episodeId)
    }

    return episodeIds
  }

  const openDialog = (item) => {
    const locationIds = extractLocationIds(item)
    const episodeIds = extractEpisodeIds(item)
    handleDialogOpen(item, locationIds, episodeIds)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={item.id} >
            <GridListTile component="div" onClick={() => openDialog(item)}>
              <img
                src={item.image}
                alt={item.title}
                className={classes.image}
              />
              <GridListTileBar
                title={item.name}
                subtitle={<span>From: {item.location?.name}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${item.name}`}
                    className={classes.icon}
                    onClick={() => openDialog(item)}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
