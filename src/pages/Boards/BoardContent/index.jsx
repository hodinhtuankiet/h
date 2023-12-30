import Box from '@mui/material/Box'
import theme from '~/theme'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      // height: { theme.trello.}
      height: (theme) => `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
      alignItems: 'center',
      display: 'flex',
      backgroundColor: theme.colorSchemes.dark.palette.primary.main
    }}>Box 3</Box>
  )
}

export default BoardContent