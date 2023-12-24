import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
function AppBar() {
  return (
    <Box sx={{
      width: '100%',
      // height: { theme.trello.}
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      // center vertical
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box>
        <AppsIcon sx={ { color: 'primary.main' } }/>
      Trello
      </Box>
      <Box>
        <ModeSelect/>
      </Box>
    </Box>
  )
}

export default AppBar