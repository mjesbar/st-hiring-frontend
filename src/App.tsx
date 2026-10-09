import { useState } from 'react'
import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { EventsPage } from './pages/EventsPage'
import { SettingsPage } from './pages/SettingsPage'

function App() {
  const [tab, setTab] = useState(0)

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'grey.50' }}>
      <AppBar position="static" color="default" elevation={1} sx={{ flexShrink: 0 }}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            See Tickets
          </Typography>
        </Toolbar>
        <Tabs value={tab} onChange={(_event, value) => setTab(value)} centered>
          <Tab label="Events" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', py: { xs: 2, sm: 4 } }}
      >
        {tab === 0 ? <EventsPage /> : <SettingsPage />}
      </Container>
    </Box>
  )
}

export default App
