import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const TitlebarImageList = (props) => {
  if (!props.itemData) return

  return (
    <ImageList>
      {props.itemData.map((item, index) => (
        <ImageListItem key={`image-${index}`}>
          <img
            src={`${item.file}`}
            srcSet={`${item.file}`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
                data-id={item.id}
                onClick={() => props.closeImage(item.id)}
              >
                  <DeleteIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default TitlebarImageList
