import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import ButtonUpload from 'components/ButtonUpload'
import Gallery from 'components/Gallery'
import Header from 'components/Header'
import { ApiService } from 'services/api.service'
import { Button } from '@mui/material'
import { AuthContext } from 'contexts/auth'
import QRCode from 'react-qr-code'

const QrCode = () => {
  const apiService = new ApiService()

  const getData = async (id) => {
    const response = await apiService.get('/admin/company/')
    // setData(response.data);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <div
            style={{
              height: 'auto',
              margin: '0 auto',
              maxWidth: 64,
              width: '100%',
            }}
          >
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={'text'}
              viewBox={`0 0 256 256`}
            />
          </div>
        </Grid>
      </Box>
    </>
  )
}

export default QrCode
