import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      // height: { theme.trello.}
      height: (theme) => `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
      alignItems: 'center',
      display: 'flex'
    }}>Box 3</Box>
  )
}

export default BoardContent