import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import SimpleList from './SimpleList'
import CharacterLocationsTable from './CharacterLocationsTable'
import CharacterEpisodesAccordions from './CharacterEpisodesAccordions'
import { Card, CardContent } from '@material-ui/core'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function ScrollableTabs({ info, locations, episodes }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const characterInfoList = [
    // { name: 'id', value: info.id },
    // { name: 'name', value: info.name },
    { name: 'status', value: info.status },
    { name: 'species', value: info.species },
    { name: 'type', value: info.type },
    { name: 'gender', value: info.gender },
    { name: 'origin', value: info.origin.name },
    { name: 'location', value: info.location.name },
  ]

  function buildCharacterLocations(locations) {
    if (locations && !Array.isArray(locations)) {
      return {
        location: [
          { name: 'id', value: locations.id },
          { name: 'name', value: locations.name },
          { name: 'type', value: locations.type },
          { name: 'dimension', value: locations.dimension },
          { name: 'residents', value: locations.residents?.length },
        ],
      }
    }

    const characterLocation = locations[0]
    const characterOrigin = locations[1]
    return {
      location: [
        { name: 'id', value: characterLocation.id },
        { name: 'name', value: characterLocation.name },
        { name: 'type', value: characterLocation.type },
        { name: 'dimension', value: characterLocation.dimension },
        { name: 'residents', value: characterLocation.residents.length },
      ],
      origin: [
        { name: 'id', value: characterOrigin.id },
        { name: 'name', value: characterOrigin.name },
        { name: 'type', value: characterOrigin.type },
        { name: 'dimension', value: characterOrigin.dimension },
        { name: 'residents', value: characterOrigin.residents.length },
      ],
    }
  }

  const characterLocations = buildCharacterLocations(locations)

  const buildCharacterEpisodesList = (episodes) => {
    function buildEpisodeItem(item) {
      return {
        id: item.id,
        title: item.name,
        list: [
          { name: 'id', value: item.id },
          { name: 'name', value: item.name },
          { name: 'date', value: item.air_date },
          { name: 'episode code', value: item.episode },
          { name: '#characters', value: item.characters?.length },
        ],
      }
    }

    if (!Array.isArray(episodes)) {
      return [buildEpisodeItem(episodes)]
    }
    return episodes && episodes.map((item) => buildEpisodeItem(item))
  }

  const characterEpisodes = buildCharacterEpisodesList(episodes)

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Locations" {...a11yProps(1)} />
          <Tab label="Episodes" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Card>
          <CardContent>
            <SimpleList items={characterInfoList} />
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CharacterLocationsTable locations={characterLocations} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CharacterEpisodesAccordions episodes={characterEpisodes} />
      </TabPanel>
    </div>
  )
}
