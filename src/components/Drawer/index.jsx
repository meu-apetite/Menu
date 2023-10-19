import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import menuItems from './items';
import * as S from './style';
import { Avatar, CardHeader, styled, useMediaQuery } from '@mui/material';
import { red } from '@mui/material/colors';
import { useContext } from 'react';
import { AuthContext } from 'contexts/auth';

const MiniDrawer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const toLink = (link) => navigate(link);

  const { company } = useContext(AuthContext);

  const CustomCardHeader = styled(CardHeader)`
    && .css-1ssile9-MuiCardHeader-avatar {
      margin: 0
    }
  `;

  return (
    <Box
      sx={{
        display: 'flex',
        
        [theme.breakpoints.down('sm')]: { position: 'absolute' },
      }}
    >
      <CssBaseline />
      <S.AppBar open={open} position="fixed" sx={{ height: "65px"}}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2, ...(open && { visibility: "hidden" }) }}
          >
            <MenuIcon />
          </IconButton>

          <S.WrapperIntro>
            <CustomCardHeader
              sx={{ flexDirection: "row-reverse", gap: 1, pr: 0, m: 0 }}
              avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{company.fantasyName[0]}</Avatar>}
              title={company.fantasyName}
            />
          </S.WrapperIntro>
        </Toolbar>
      </S.AppBar>

      <S.Drawer variant="permanent" open={open}>
        <S.DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </S.DrawerHeader>

        {menuItems.map((group, menuIndex) => (
          <Box key={menuIndex}>
            <Divider key={menuIndex} />
            <List>
              {group.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={() => toLink(item.link)}>
                  <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                    <ListItemIcon title={item.text} sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                      <item.Icon />
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </S.Drawer>
    </Box>
  );
};

export default MiniDrawer;
