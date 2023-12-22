import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.dark',
      width: '100%',
      // height: { theme.trello.}
      height: (theme) => theme.trello.boardBarHeight,
      alignItems: 'center',
      display: 'flex'
    }}>   Box 2    </Box>
  )
}

export default BoardBar