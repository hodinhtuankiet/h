import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as trelloLogo } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
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
        <AppsIcon sx={ { color: 'primary.main' } }/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '2' }}>
          <SvgIcon component={trelloLogo} inheritViewBox sx={ { color: 'primary.main' } } />
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Trello </Typography>
        </Box>
        <Workspaces/>
      </Box>

      <Box>
        <ModeSelect/>
      </Box>
    </Box>
  )
}

export default AppBar