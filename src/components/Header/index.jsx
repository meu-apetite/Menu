import * as S from './style'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import { useNavigate } from 'react-router-dom'

const Header = (props) => {
  const navigate = useNavigate()

  return (
    <S.Header
      component="header"
      sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      {!props.children ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {props.back && <NavigateBeforeIcon sx={{ cursor: 'pointer' }} onClick={() => navigate(props.back)} />}
            <Typography variant="h1">{props.title}</Typography>
          </Box>
          <Button variant="contained" onClick={props.buttonClick} disabled={props.buttonDisabled || false}>
            {props.buttonText}
          </Button>
        </>
      ) : (
        props.children
      )}
    </S.Header>
  )
}

export default Header
