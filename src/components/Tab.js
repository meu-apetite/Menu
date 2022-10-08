import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const BasicTabs = (props) => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => setValue(newValue)

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ display: 'flex', flexWrap: 'wrap' }}
          variant="scrollable"
        >
          {props.tabs.map((item, i) => (
            <Tab key={`title-${i}`} label={item.title} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>

      {props.tabs.map((item, i) => (
        <TabPanel key={`body-${i}`} value={value} index={i}>
          {item.body}
        </TabPanel>
      ))}
    </Box>
  )
}

export default BasicTabs
