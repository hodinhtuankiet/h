import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
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
function AppBar() {
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
        <Box pl={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <SvgIcon component={trelloLogo} inheritViewBox sx={ { color: 'primary.main' } } />
          {/* Text */}
          <Typography pl={0.4} sx={{ fontSize: '1.2rem', fontWeight: 'bold', pl : '1' }}>Trello </Typography>
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
          {/* Hiện lên hình tròn cho notifi  */}
          <Badge color="primary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
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