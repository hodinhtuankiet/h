import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import Popup from '~/components/Dialog/Dialog'
import { readAPI } from '~/apis'
function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    // có id để biết đang kéo thả cái id nào
    id: card._id,
    // Spread syntax
    data: { ...card }
  })
  const dndKitCardStyles = {
    // fix dựt dựt (kéo thả) trên mobile
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    // đang kéo thì card mờ đi
    opacity: isDragging ? 0.5 : undefined
  }
  const [openPopup, setOpenPopup] = useState(false)
  const [cardData, setCardData] = useState(null)
  // nếu 1 trong 3 cái tồn tại thì True -> sẽ được show lên
  // Còn false thì nó sẽ không bị cái padding để ko dư thừa khoảng trắng
  const readCardDetails = async () => {
    try {
      const response = await readAPI(card._id)
      // return response
      setCardData(response)
    } catch (error) {
      console.error('Error fetching card details:', error)
    }
  }
  const updateCardData = (updatedCardData) => {
    // Update card data in the state
    setCardData(updatedCardData)
  }
  const shouldShowCardActions = () => {
    // dùng !! để return về true hoặc false nếu không thì nó sẽ return về 0
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <>
      <MuiCard
        // set kéo thả
        ref={setNodeRef}
        style={dndKitCardStyles}
        {...attributes}
        {...listeners}
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset',
          border: '1px solid transparent',
          '&:hover': {
            borderColor: (theme) => theme.palette.primary.main
          }
        }}
        onClick={() => {
          readCardDetails()
          setOpenPopup(true)
          // setCardData(readCardDetails())
        }} >
        {/* nếu như tồn tại card cover thì có ảnh cardMedia  */}
        {card?.cover &&
      <CardMedia sx={{ height: 140 }} image={card?.images} /> }
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          {/* Title Card  */}
          <Typography>{card?.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {card?.description}
          </Typography>
        </CardContent>
        {/*Example: ![].length -> 0(False) True phủ định  */}
        {/* ![].length -> 0(True) False  */}
        {/* ![1].length -> 1 True  */}
        { shouldShowCardActions() &&
        <CardActions sx={{ p: '0 4px 8px 4px' } }>
          {/* Nếu !!card?.memberIds?.length là True (Có data ) thì đổ dữ liệu vào */}
          {!!card?.memberIds?.length &&
        <Button size="small" startIcon={ <GroupIcon/> }>{card?.memberIds?.length}</Button>
          }
          {/* số người comments  */}
          {!!card?.comments?.length &&
        <Button size="small" startIcon={ <CommentIcon/> }>{card?.comments?.length}</Button>
          }
          {/* số  attachments  */}
          {!!card?.attachments?.length &&
        <Button size="small" startIcon={ <AttachFileIcon/> }>{card?.attachments?.length}</Button>
          }
          {/* <Button size="small" startIcon={ <CommentIcon/> }>15</Button>
        <Button size="small" startIcon={ <AttachFileIcon/> }>6</Button> */}
        </CardActions>
        }
      </MuiCard>
      {!openPopup ? (null) : (
        <Popup
          title="Update Card"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          card={cardData}
          updateCardData={updateCardData}
        >
        </Popup>)}
    </>
  )
}

export default Card