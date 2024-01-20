import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

function _id() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // tại thời fix cứng boardId , sd react-router-dom để lấy
    const boardId = '65abe2401eccfccf90b9059d'
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
      // console.log(response)
    })
  }, [])
  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
      <AppBar/>
      {/* hồi trước là dùng mockData?.board */}
      <BoardBar board={board} />
      <BoardContent board={board}/>
    </Container>
  )
}
export default _id