import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import SimpleList from './SimpleList'
import BasicTable from './BasicTable'
import CustomizedAccordions from './CustomizedAccordions'
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
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
          <Tab
            label="Info"
            // icon={<PermIdentityOutlinedIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label="Locations"
            // icon={<LocationOnOutlinedIcon />}
            {...a11yProps(1)}
          />
          <Tab
            label="Episodes"
            // icon={<VisibilityOutlinedIcon />}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Card>
          <CardContent>
            <SimpleList />
          </CardContent>
        </Card>
        <pre>{JSON.stringify(info, null, 4)}</pre>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BasicTable />
        <pre>{JSON.stringify(locations, null, 4)}</pre>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CustomizedAccordions />
        <pre>{JSON.stringify(episodes, null, 4)}</pre>
      </TabPanel>
    </div>
  )
}
