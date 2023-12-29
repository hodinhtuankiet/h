import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      // height: { theme.trello.}
      height: (theme) => theme.trello.boardBarHeight,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 1,
      overflowX: 'auto',
      borderTop: '1px solid #e74c3c'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>Box 1</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>Box 2</Box>

    </Box>
  )
}

export default BoardBar