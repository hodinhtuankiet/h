import Card from '../ListCards/Card/Card'
import Box from '@mui/material/Box'
function ListCards({ cards }) {
  return (
    <Box
      sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `
        calc(${theme.trello.boardContentHeight}
           - ${theme.spacing(5)}
            - ${theme.trello.columnHeaderHeight}
             - ${theme.trello.columnFooterHeight})`,
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bdc3c7'
        }
      }}>

      {cards?.map(card => <Card key={card._id} card={ card } />)}

      {/* Cái này là list ra card có ảnh và không có ảnh  */}
      {/* <Card/> */}
      {/* <Card temporaryHideMedia /> */}
    </Box>
  )
}

export default ListCards