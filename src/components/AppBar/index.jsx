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
function AppBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      // height: { theme.trello.}
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      // center vertical
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '2' }}>
        <AppsIcon sx={ { color: 'primary.main', gap: '2' } }/>
        <Box pl={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <SvgIcon component={trelloLogo} inheritViewBox sx={ { color: 'primary.main' } } />
          {/* Text */}
          <Typography pl={0.4} sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Trello </Typography>
        </Box>
        <Workspaces/>
        <Recent/>
        <Started/>
        <Template/>

        <Button variant="outlined" >
            Create
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '2' }}>
        <TextField id="outlined-search" label="Search...." type="search" size='small' />
        <ModeSelect/>
        {/* Tooltip hover vào hiện chữ  */}
        <Tooltip title="Notification">
          {/* Hiện lên hình tròn cho notifi  */}
          <Badge color="primary" variant="dot" sx={{ cursor: 'pointer'}}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Question">
          <HelpOutLineIcon color="secondary" variant="dot" sx={{ cursor: 'pointer'}}>
          </HelpOutLineIcon>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar