import React, { useState } from 'react'
import { createTheme } from '@mui/material/styles'
import themeDark from 'styles/theme/dark'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

const getTheme = (theme) => {
  if (theme === 'dark') return createTheme(themeDark)
  return createTheme(themeDark)
}

const SelectCustom = (props) => {
  const theme = getTheme('dark')
  const getStyles = (name, personName, theme) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
  }

  const MenuProps = {
    PaperProps: { style: { maxHeight: 48 * 4.5 + 8, width: 250 } },
  }

  return (
    <Box component="section" noValidate sx={{ mt: 1 }}>
      <div>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel
            id="select-categories"
            sx={{
              background: theme.palette.background.default,
              padding: '0 5px',
            }}
          >
            Categorias
          </InputLabel>
          <Select
            labelId="select-categories"
            multiple
            value={props.categories}
            onChange={props.change}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {props.data.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, props.categories, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  )
}

export default SelectCustom
