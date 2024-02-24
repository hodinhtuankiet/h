import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { ContentCopy, ContentPaste } from '@mui/icons-material'
import * as React from 'react'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/order-array'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
// Cấu hình toast-toastify
import { toast } from 'react-toastify'
// CONFIG MATERIAL DIALOG
import { useConfirm } from 'material-ui-confirm'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'

function Column({ column, funcCreateNewCard, deleteColumnDetails }) {
  // Xử lí API , ĐÓNG MỞ KHI CLICK VÀ ADD NEW CARD
  const [imageSrc, setImageSrc] = useState(null)
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result)
        console.log('Image Src:', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const [openAddNewCard, setOpenNewCard] = useState(false)
  // When click , it's will switch true -> false or false -> true
  const toggleOpenNewCard = () => setOpenNewCard(!openAddNewCard)

  const [newCardTitle, setnewCardTitle] = useState('')

  const [newCardDescription, setnewCardDescription] = useState('')

  const AddNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Title Card Do Not Empty !')
      return
    }
    // new data card
    const newCardData = {
      title: newCardTitle,
      columnId: column._id,
      description: newCardDescription,
      images: imageSrc || []
    }
    // props được truyền từ BoardContent
    try {
      // Chắc chắn rằng bạn đang truyền dữ liệu đúng định dạng
      console.log('Data sent to API:', newCardData)
      await funcCreateNewCard(newCardData)
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error('Error creating new card:', error)
    }

    toggleOpenNewCard()
    setnewCardTitle('')
    setnewCardDescription('')
    setImageSrc(null)
  }
  const confirm = useConfirm()
  const handleDeleteColumn = () => {
    confirm({
      // description: 'This action is permanent!',
      title: 'Delete Column?',
      allowClose: false,
      content: 'This action will permanently delete your Column. Are you sure?',
      confirmationButtonProps: { color:'primary', variant: 'outlined' }

      // description: 'This action is permanent!',
      // confirmationKeyword: 'column'
    })
      .then(() => {
        deleteColumnDetails(column._id)
      })
      .catch(() => {
        /* ... */
      })
  }
  const VisuallyHiddenInput = styled('input')({
    // clip: 'rect(0 0 0 0)',
    // clipPath: 'inset(50%)',
    height: 1,
    // overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 1,
    whiteSpace: 'nowrap',
    width: 1 })
  const ImageContainer = styled('div')({
    marginTop: '5px',
    textAlign: 'left',
    borderRadius: '100px'
  })
  const CloseButton = styled('button')({
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: 'white',
    padding: '5px',
    borderRadius: '50%',
    transition: 'opacity 0.3s',
    '&:hover': {
      opacity: 0.8
    }
  })
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    // có id để biết đang kéo thả cái id nào
    id: column._id,
    // Spread syntax
    data: { ...column }
  })
  const dndKitColumnStyles = {
    // fix dựt dựt (kéo thả) trên mobile
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    // đang kéo thì column mờ đi
    opacity: isDragging ? 0.5 : undefined
    // borderRadius: 'dark' ? '#333643' : '#ebecf0'
  }
  const handleImageClick = () => {
    setImageSrc(null)
  }
  // JavaScript cho dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderedCards = mapOrder(column.cards, column.cardOrderIds, '_id')
  return (
    // Column 1
    // bọc thẻ div ở ngoài để fix bug kéo giữa column nhỏ và to bị dựt
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
      // chỉ khi kéo ở trong Box thì mới lắng nghe va thực hiện còn div ở ngoài set height nó 100% rồi
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          // backgroundColor: (theme) => (theme.colorSchemes.dark.palette.primary.main),
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          overflowY: openAddNewCard ? 'auto' : 'unset',
          overflowX: 'hidden',
          // overflowY: 'hidden',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
        {/* Header  */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Typography variant='h7'
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>{column?.title}</Typography>
          <Box>
            <Tooltip>
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-button-workspaces"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-workspaces'
              }}
            >
              <MenuItem
                sx={{
                  '&:hover':{
                    color: '#2980b9',
                    '& .add-foreverIcon':{ color: '#2980b9' }
                  }
                }}
                onClick={toggleOpenNewCard}
              >
                <ListItemIcon><AddCardIcon className='add-foreverIcon' fontSize="small" /></ListItemIcon>
                <ListItemText>Add New Card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                sx={{
                  '&:hover':{
                    color: 'warning.dark',
                    '& .delete-foreverIcon':{ color: 'warning.dark' }
                  }
                }}
                onClick={handleDeleteColumn}
              >
                <ListItemIcon><DeleteForeverIcon className='delete-foreverIcon' fontSize="small" /></ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* CONTENT - lIST CARD */}
        {/* cars: truyền props đến file ListCard.jsx  */}
        <ListCards cards={ orderedCards }/>
        {/* FOOTER  */}
        <Box
          sx={{
            height: openAddNewCard ? (theme) => theme.trello.columnFooterHeightToggle : (theme) => theme.trello.columnFooterHeight,
            p: 2,
            minWidth: '300px'
            // overflow: openAddNewCard ? 'auto' : 'unset'
            // maxHeight: '150px'
          }}
        >
          {!openAddNewCard ? (
            <Box
              onClick={toggleOpenNewCard}
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button sx={{ color: 'text.primary' }} startIcon={<AddCardIcon />}>
              Add New Card
              </Button>
              <Tooltip title="Drag to move ">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box sx={{
              // height: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 1.3,
              minWidth: '250px',
              maxWidth: '250px',
              height: 'fit-content',
              // overflow: 'unset',
              // minHeight: openAddNewCard ? 'auto' : (theme) => theme.trello.columnFooterHeight
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
            }}>
              {/* Title Card  */}
              <TextField fullWidth id="outlined-basic"
                label="Add title card"
                type="search"
                size='small'
                variant='outlined'
                autoFocus
                value={newCardTitle}
                // khi onChange value trong TextField thì gán lại value
                onChange={(e) => setnewCardTitle(e.target.value)}
                sx={{
                  minWidth: 100,
                  flexShrink: 0,
                  '& label': { color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#636e72') },
                  '& input': { color: 'primary' },
                  // label khi focused vào
                  '& label.Mui-focused': { color: 'primary' },
                  '& .MuiOutlinedInput-root': {
                  // border khi chưa hover
                    '& fieldset': { borderColor: 'primary' },
                    // khi hover vào
                    '&:hover fieldset': { borderColor: 'white' },

                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
                }}/>
              {/* Upload File  */}
              <Button sx={{ marginRight: 13, color:'white', fontSize: 12, width: '145px' }} size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload Images
              <VisuallyHiddenInput type="file" name="images" onChange={handleFileChange} />
              </Button>
              {imageSrc && (
                <ImageContainer>
                  {imageSrc && (
                    <>
                      {/* <CloseButton onClick={handleImageClick}>&times;</CloseButton> */}
                      <img
                        src={imageSrc}
                        alt="Uploaded"
                        style={{ maxWidth: '100%', maxHeight: '200px', paddingBottom: 0 }}
                        onClick={handleImageClick}
                      />
                    </>
                  )}
                </ImageContainer>
              )}
              {/* Description Card  */}
              <TextField fullWidth id="outlined-basic"
                label="Add description card"
                type="search"
                size='small'
                // variant='outlined'
                autoFocus
                multiline
                rows={4}
                variant="filled"
                value={newCardDescription}
                // khi onChange value trong TextField thì gán lại value
                onChange={(e) => setnewCardDescription(e.target.value)}
                sx={{
                  minWidth: 100,
                  minheight: 50,
                  flexShrink: 0,
                  // height: 'fit-content',
                  '& label': { color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#636e72') },
                  '& input': { color: 'primary' },
                  // label khi focused vào
                  '& label.Mui-focused': { color: 'primary' },
                  '& .MuiOutlinedInput-root': {
                  // border khi chưa hover
                    '& fieldset': { borderColor: 'primary' },
                    // khi hover vào
                    '&:hover fieldset': { borderColor: 'white' },

                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
                }}/>
              {/* Button add new card  */}
              <Box sx={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: 1, paddingBottom:1.9 }}>
                <Button
                  onClick={AddNewCard}
                  variant='contained'
                  size='small'
                  sx={{
                    color: 'primary.main', // Đặt màu chữ thành màu đen
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#636e72' : 'white'), // Đặt màu nền thành màu xám
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'primary.main'),
                    '&:hover': {
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#ebecf0')
                    },
                    flexShrink: 0,
                    typography: {
                      fontSize: '14px'
                    // textTransform: 'none'
                    // Đặt kích thước chữ là 12px
                    }
                  }}
                >
              Add new card
                </Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: 'primary',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'red'
                    }
                  }}
                  onClick={toggleOpenNewCard}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column