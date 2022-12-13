import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function SelectSmall(props) {
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-select-small">{props.label}</InputLabel>
      <Select
        labelId="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        {props.data.map((item) => (
          <MenuItem value={item.value}>{item.text}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
