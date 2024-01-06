import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'


function BoardContent() {
  return (
    // BoardContent
    <Box sx={{
      width: '100%',
      // height: { theme.trello.}
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex',
      // bgcolor: theme.colorSchemes.light.palette.primary.main,
      // fix thanh scrolling không bị hiển thị ra khoảng trắng khi màn hình nhỏ
      overflowX: 'auto',
      overflowY: 'hidden',
      p: '10px 0'
    }}>
      <ListColumns/>
    </Box>
  )
}

export default BoardContent