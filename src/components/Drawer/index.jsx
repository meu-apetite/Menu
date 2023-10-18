import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  Avatar,
  CardHeader,
  styled,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  Toolbar,
  IconButton,
  Menu,
  Divider,
  Box,
} from '@mui/material'
import { AuthContext } from 'contexts/auth'
import menuItems from './items'
import * as S from './style'

const MiniDrawer = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)
  const toLink = (link) => navigate(link)

  const { company } = useContext(AuthContext)

  const CustomCardHeader = styled(CardHeader)`
    && .css-1ssile9-MuiCardHeader-avatar {
      margin: 0;
    }
  `

  return (
    <Box
      sx={{
        display: 'flex',

        [theme.breakpoints.down('sm')]: { position: 'absolute' },
      }}
    >
      <CssBaseline />
      <S.AppBar open={open} position="fixed" sx={{ height: '65px' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2, ...(open && { visibility: 'hidden' }) }}
          >
            <Menu />
          </IconButton>

          <S.WrapperIntro>
            <CustomCardHeader
              sx={{ flexDirection: 'row-reverse', gap: 1, pr: 0, m: 0 }}
              avatar={
                <Avatar sx={{ bgcolor:'#c6c6c6' }} aria-label="recipe">
                  {company.fantasyName[0]}
                </Avatar>
              }
              title={company.fantasyName}
            />
          </S.WrapperIntro>
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
                      title={item.text}
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
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
