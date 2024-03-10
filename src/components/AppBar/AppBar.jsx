import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { ReactComponent as trelloLogo } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Started from './Menus/Started'
import Template from './Menus/Template'
import Profiles from './Menus/Profiles'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutLineIcon from '@mui/icons-material/HelpOutLine'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import React from 'react'
import { Popover } from '@mui/material'
function AppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <Box px={2} sx={{
      width: '100%',
      // height: { theme.trello.}
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      // center vertical
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AppsIcon sx={ { color: 'primary.main' } }/>
        <Box pl={1.5} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={trelloLogo} inheritViewBox sx={ { color: 'primary.main' } } />
          {/* Text */}
          <Typography pl={0.9} sx={{ fontSize: '1.3rem', fontWeight: 'bold', pl : '1', color: 'primary.main' }}> KIET</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap : 1 }}>
          <Workspaces sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ) }} />
          <Recent/>
          <Started/>
          <Template/>
          <Button variant="outlined" startIcon={<NoteAddIcon/>}>
            Create
          </Button>
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        <TextField id="outlined-search" label="Search...." type="search" size='small' sx={{ minWidth: 100 }}/>
        <ModeSelect/>
        {/* Tooltip hover vào hiện chữ  */}
        <Tooltip title="Notification">
          <Badge color="primary" variant="dot" sx={{ cursor: 'pointer' }} onClick={handleNotificationClick}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://watermark.lovepik.com/photo/20211203/large/lovepik-smiling-man-picture_501490289.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                Ali Connors
                    </Typography>
                    {' — I\'ll be in your neighborhood doing errands this…'}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="https://cafebiz.cafebizcdn.vn/162123310254002176/2020/9/15/1-1600135860402749216525.png" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                to Scott, Alex, Jennifer
                    </Typography>
                    {' — Wish I could come, but I\'m out of town this…'}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="https://lh4.googleusercontent.com/WSGZnJHFeJPasjNCsH0GlDlfgN85em5PmDR_MRw5lQxz58esADMU7l3qP6Rq-83VIB8-vuv3eaMKCgDsbqTZMBnL1g3DrHlmxXAM4mnq8oXApXe5xDjQVgbt7hzllN1_RqPadVOSgkkDEPq5XQ" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                Sandra Adams
                    </Typography>
                    {' — Do you have Paris recommendations? Have you ever…'}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Popover>
        {/* bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ) } */}
        <Tooltip title="Question">
          <HelpOutLineIcon color="(theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' )" variant="dot" sx={{ cursor: 'pointer' }}>
          </HelpOutLineIcon>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar