import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/order-array'
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
function BoardContent({ board }) {

  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // Yêu cầu mouse di chuyền 10px thì mới kích hoạt event , fix TH click bị gọi handleDragEnd
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Yêu cầu cảm ứng chạm vào màng hình 250ms thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay:250, tolerance:5 } })

  // const sensor = useSensors(pointerSensor)
  const sensor = useSensors(mouseSensor, touchSensor)


  const [orderedColumn, setOrderedColumnsState] = useState([])

  // callback trong useEffect sẽ được gọi khi board thay đổi
  // có nghĩa khi di chuyển board thì sẽ setOrderedColumnsState lại
  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('handle Event', event)
    // destrutering lấy ra các key của event
    const { active, over } = event
    // Kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return lun tránh lỗi)
    if (!over) return
    // Nếu kéo thay đổi vị trí thì thực hiện set index board lại
    // active : vị trí cũ
    // over : vị trí mới sau khi kéo
    if (active.id !== over.id) {
      // Lấy vị trí cũ từ thằng active
      const oldIndex = orderedColumn.findIndex(c => c._id === active.id)
      // Lấy vị trí mới từ thằng over
      const newIndex = orderedColumn.findIndex(c => c._id === over.id)

      // arrayMove(items, oldIndex, newIndex); item: orderedColumn
      // arrayMove hiển thị list thông tin về board sau khi kéo
      const dndOrderedColumns = arrayMove(orderedColumn, oldIndex, newIndex)
      // mảng Ids sau khi kéo Ex: ["column-id-02","column-id-01","column-id-03"]
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log(dndOrderedColumns)
      // console.log(dndOrderedColumnsIds)
      // set lại State -> Kéo OK !
      setOrderedColumnsState(dndOrderedColumns)
    }
  }

  return (
    // BoardContent
    <DndContext onDragEnd={handleDragEnd} sensors={sensor}>
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