import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const LoadingPage = (props) => (
  <Box
    sx={{
      background: '#000000',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      opacity: 0.9,
      zIndex: 9999,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box sx={{ display: 'grid', gap: 1 }}>{props.children}</Box>
    <CircularProgress disableShrink />
    <Typography>{props.text}</Typography>
  </Box>
)

export default LoadingPage
