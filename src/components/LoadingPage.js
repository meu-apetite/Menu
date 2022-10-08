import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const LoadingPage = (props) => (
  <Box
    sx={{
      background: '#000000',
      height: '100%',
      width: '100%',
      position: 'fixed',
      top: 0,
      opacity: 0.9,
      zIndex: 2,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box sx={{display: 'grid', gap: 1}}>{props.children}</Box>
    { props.active && (
      <>
        <CircularProgress disableShrink />
        <Typography>{props.text}</Typography>
      </>
    )}
  </Box>
)

export default LoadingPage
