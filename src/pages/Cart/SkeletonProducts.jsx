
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Skeleton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const SkeletonProducts = (props) => {
  const itens = Array.from({ length: props.products });

  return (
    <List>
      {itens.map((item, i) => (
        <div key={`id-${i}`}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            </ListItemAvatar>
            <div style={{ display: 'grid', width: '100%' }}>
              <Skeleton
                animation="wave"
                height={20}
                width="32%"
                sx={{ marginTop: 1, minWidth: '140px' }}
              />
              <Skeleton
                animation="wave"
                height={15}
                width="24%"
                sx={{ minWidth: '100px' }}
              />
            </div>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default SkeletonProducts;