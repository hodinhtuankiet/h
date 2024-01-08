import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachFileIcon from '@mui/icons-material/AttachFile'
function Card({ card }) {
  // nếu 1 trong 3 cái tồn tại thì True -> sẽ được show lên
  // Còn false thì nó sẽ không bị cái padding để ko dư thừa khoảng trắng
  const shouldShowCardActions = () => {
    // dùng !! để return về true hoặc false nếu không thì nó sẽ return về 0
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      {/* nếu như tồn tại card cover thì có ảnh cardMedia  */}
      {card?.cover &&
      <CardMedia sx={{ height: 140 }}image={card?.cover} /> }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        {/* Title Card  */}
        <Typography>{card?.title}</Typography>
        <Typography variant="body2" color="text.secondary">
      Lizards are a widespread group of squamate reptiles, with over 6,000
      species, ranging across all continents except Antarctica
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
  )
}

export default Card