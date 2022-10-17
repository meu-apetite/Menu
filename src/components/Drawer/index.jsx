import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Brightness3Icon from '@mui/icons-material/Brightness3'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import menuItems from './items'
import { AuthContext } from 'contexts/auth'
import * as S from './style'

const MiniDrawer = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)
  const toLink = (link) => navigate(link)
  const authContext = React.useContext(AuthContext)
  const company = authContext.company

  const changeTheme = () => {
    const currentTheme = localStorage.getItem('theme')
    if (currentTheme === 'light') {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light')
    }
    document.location.reload()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
          position: 'absolute',
        },
      }}
    >
      <CssBaseline />
      <S.AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <S.WrapperIntro>
            <S.Logo
              src={company?.custom?.logo}
              alt={`logo marca ${company.fantasyName}`}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ textTransform: 'Capitalize' }}
            >
              {company.fantasyName}
            </Typography>
          </S.WrapperIntro>

          {theme.palette.mode === 'light' ? (
            <Brightness3Icon onClick={changeTheme} sx={{ cursor: 'pointer' }} />
          ) : (
            <Brightness4Icon onClick={changeTheme} sx={{ cursor: 'pointer' }} />
          )}
        </Toolbar>
      </S.AppBar>
      <S.Drawer variant="permanent" open={open}>
        <S.DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </S.DrawerHeader>

        {menuItems.map((group, menuIndex) => (
          <Box key={menuIndex}>
            <Divider key={menuIndex} />
            <List>
              {group.map((item, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ display: 'block' }}
                  onClick={() => toLink(item.link)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                      title={item.text}
                    >
                      <item.Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </S.Drawer>
    </Box>
  )
}

export default MiniDrawer
