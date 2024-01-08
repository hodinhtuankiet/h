import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/order-array'
import { DndContext } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
function BoardContent({ board }) {

  const [orderedColumn, setOrderedColumnsState] = useState([])

  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('handle Event', event)
    const { active, over } = event

    if (active.id !== over.id) {
      console.log('keo ok')
    }
  }

  return (
    // BoardContent
    <DndContext onDragEnd={handleDragEnd}>
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
        <ListColumns columns={orderedColumn}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent