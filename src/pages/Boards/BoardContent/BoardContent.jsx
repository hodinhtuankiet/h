import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/order-array'
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimation, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}
function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // Yêu cầu mouse di chuyền 10px thì mới kích hoạt event , fix TH click bị gọi handleDragEnd
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Yêu cầu cảm ứng chạm vào màng hình 250ms thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay:250, tolerance:5 } })

  // const sensor = useSensors(pointerSensor)
  // ưu tiên sử dụng 2 loại sensor mouse và touch trên mobile để tránh bug
  const sensor = useSensors(mouseSensor, touchSensor)

  // cái này dùng để set vị trí column sau khi kéo
  const [orderedColumn, setOrderedColumnsState] = useState([])
  // cùng một thời điểm chỉ có một phần tử đang được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemIdType, setActiveDragItemIdType] = useState(null)
  const [activeDragItemIdData, setActiveDragItemIdData] = useState(null)

  // callback trong useEffect sẽ được gọi khi board thay đổi
  // có nghĩa khi di chuyển board thì sẽ setOrderedColumnsState lại
  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const findColumnByCardId = (cardId) => {
    // vì mảng nên sài find lun
    // đi vào columns ở mockdata rồi vào map cards , rồi map các _id của từng card xem nó có trùng với tham số cardId đưa vào không
    return orderedColumn.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  // xử lí khi bắt đầu click
  const handleDragStart = (event) => {
    // console.log('handle Start', event)
    setActiveDragItemId(event?.active?.id)
    // Nếu nó tồn tại columnId thì Type nó là CARD còn không là COLUMN
    setActiveDragItemIdType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemIdData(event?.active?.data?.current)
  }
  // xử lí kéo card
  const handleDragOver = (event) => {
    if (activeDragItemIdType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // console.log('dragover', event)
    // destrutering lấy ra các key của event
    const { active, over } = event
    if (!active || !over) return
    // activeDraggingCardId là card đang được kéo
    const { id: activeDraggingCardId, data:{ current: activeDraggingCardData } } = active
    // overCardId là card đang tương tác trên hoặc dưới so với card được kéo ở trên
    const { id: overCardIdItem } = over

    // bản chất là để biết cái card đang kéo sang id của column nào
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardIdItem)

    if (!activeColumn || !overColumn ) return
    // kiểm tra kéo card từ 2 column khác nhau thì xử lí logic
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnsState(prevColumns => {
        const overCardId = overColumn?.cards?.findIndex( card => card.id === overCardIdItem)
        // logic tính toán (cardIndex) mới trên hoặc dưới overcard
        let newCardIndex
        // rect: vị trí của phần tử đấy so với khung hình
        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        // overColumn : số card
        newCardIndex = overCardId >= 0 ? overCardId + modifier : overColumn?.cards?.length + 1

        // clone mảng setOrderedColumnsState cũ ra một cái mới để xử lí data rồi return-
        // cập nhật lại setOrderedColumnsState mới
        const nextColumns = cloneDeep(prevColumns)
        // mảng cũ trước khi drag
        const activeColumns = nextColumns.find(column => column._id === activeColumn._id)
        // array after drag
        const nextOverColumns = nextColumns.find(column => column._id === overColumn._id)

        if (activeColumns) {
          // xóa card ở cái column active (là column cũ) , lúc kéo sang column khác
          // filter là tạo ra mảng mới có card._id === activeDraggingCardId
          activeColumns.cards = activeColumns.cards.filter(card => card._id !== activeDraggingCardId)
          // cập nhật lại mảng cardOrderIds cũ cho chuẩn dữ liệu
          activeColumns.cardOrderIds = activeColumns.cards.map(card => card._id)
        }
        if (nextOverColumns) {
          // kiểm tra card đang kéo đã có ở column muốn over vào chưa , nếu có thì xóa nó trước
          nextOverColumns.cards = nextOverColumns.cards.filter(card => card._id !== activeDraggingCardId)
          // dùng toSpliced thay vì splice vì nó tạo ra một mảng mới từ mảng cũ
          nextOverColumns.cards = nextOverColumns.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // cập nhật lại mảng cardOrderIds mới cho chuẩn dữ liệu
          nextOverColumns.cardOrderIds = nextOverColumns.cards.map(card => card._id)

        }
        return nextColumns
      })
    }
  }
  // xử lí khi thả chuột
  const handleDragEnd = (event) => {
    // console.log('handle dragend Event', event)
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
    // kéo thì có dữ liệu thả ra thì null
    setActiveDragItemId(null)
    setActiveDragItemIdType(null)
    setActiveDragItemIdData(null)
  }

  // log ra để xem data
  // console.log('activeDragItemId: ', activeDragItemId )
  // console.log('activeDragItemIdType: ', activeDragItemIdType )
  // console.log('activeDragItemIdData: ', activeDragItemIdData )
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }


  return (
    // BoardContent
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensor}>
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
        {/* Phần dữ chổ , khi kéo thì có cái bóng của nó  */}
        {/* dropAnimation để khi kéo thả mượt hơn cho phân overlay  */}
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemIdType) && null}
          {/*  truyền một props activeDragItemIdData , là data của cả column nó để nó show cái bóng y hết ra
           vì đã import Column rồi nên props cũng là column */}
          {(activeDragItemIdType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemIdData}/>}
          {(activeDragItemIdType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemIdData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent