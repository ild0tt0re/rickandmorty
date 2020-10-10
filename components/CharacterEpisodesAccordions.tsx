import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SimpleList from './SimpleList'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    accordionDetails: {
      justifyContent: 'center',
    },
  })
)

export default function CharacterEpisodesAccordions({ episodes }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      {episodes.map((episode) => (
        <Accordion
          expanded={expanded === episode.id}
          onChange={handleChange(episode.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${episode.id}-content`}
            id={episode.id}
          >
            <Typography className={classes.heading}>#{episode.id}</Typography>
            <Typography className={classes.secondaryHeading}>
              {episode.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <SimpleList items={episode?.list} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
