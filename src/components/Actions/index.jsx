import React from 'react'
import * as S from './style'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

const Actions = (props) => {
  return (
    <S.WrapperActions>
      <S.Action><VisibilityIcon onClick={props.viewFn} /></S.Action>
      <S.Action><EditIcon onClick={props.updateFn} sx={{ color: '#1c54b2' }} /></S.Action>
      <S.Action><DeleteIcon onClick={props.deleteFn} sx={{ color: '#ff4569' }} /></S.Action>
    </S.WrapperActions>
  )
}

export default Actions
