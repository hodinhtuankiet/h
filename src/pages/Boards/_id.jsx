import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { createNewColumnAPI, fetchBoardDetailsAPI, createNewCardAPI } from '~/apis'

function _id() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // tại thời fix cứng boardId , sd react-router-dom để lấy
    const boardId = '65b262a107e5cd6761df3266'
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
      // console.log(response)
    })
  }, [])

  // Function have mission call API create new Column & Refresh data Sate Board
  const createNewColumn = async (dataColumnAPI) => {
    const createdColumn = await createNewColumnAPI({
      // spread operator (...) là một cách tiện lợi để tạo ra một bản sao của
      // đối tượng dataColumnAPI với thêm một thuộc tính mới boardId.
      ...dataColumnAPI,
      // khi tạo mới Column và Card dều có boardId nên phải truyền props như vậy
      boardId: board._id
    })
  }
  const createNewCard = async (dataCardAPI) => {
    const createdCard = await createNewCardAPI({
      // spread operator (...) là một cách tiện lợi để tạo ra một bản sao của
      // đối tượng dataCardAPI với thêm một thuộc tính mới boardId.
      ...dataCardAPI,
      // khi tạo mới Column và Card dều có boardId nên phải truyền props như vậy
      boardId: board._id
    })
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
      <AppBar/>
      {/* hồi trước là dùng mockData?.board */}
      <BoardBar board={board} />
      <BoardContent
      // props đặt tên như nào cũng được để đẩy xuống Column
        board={board}
        funcCreateNewColumn={createNewColumn}
        funcCreateNewCard={createNewCard}

      />
    </Container>
  )
}
export default _id