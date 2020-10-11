import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
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

export default function CharacterTabs({ info, locations, episodes }) {
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
        <CharacterLocationsTable locations={locations} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CharacterEpisodesAccordions episodes={episodes} />
      </TabPanel>
    </div>
  )
}
