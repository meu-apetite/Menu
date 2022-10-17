import React from 'react'
import * as S from './style'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import fetchApi from 'fetch'

const Actions = (props) => {
  const navigate = useNavigate()

  return (
    <S.WrapperActions>
      <S.Action>
        <VisibilityIcon
          onClick={() => navigate({ pathname: 'view/', search: props.id })}
        />
      </S.Action>
      <S.Action>
        <EditIcon
          onClick={() => navigate({ pathname: 'update/', search: props.id })}
          sx={{ color: '#1c54b2' }}
        />
      </S.Action>
      <S.Action>
        <DeleteIcon
          onClick={async () =>
            await fetchApi('delete', `categories/${[props.id]}`)
          }
          sx={{ color: '#ff4569' }}
        />
      </S.Action>
    </S.WrapperActions>
  )
}

export default Actions
