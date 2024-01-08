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

function Column({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    // có id để biết đang kéo thả cái id nào
    id: column._id,
    // Spread syntax
    data: { ...column }
  })
  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition
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
    <Box
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
      {...listeners}
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        // backgroundColor: (theme) => (theme.colorSchemes.dark.palette.primary.main),
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
        ml: 2,
        borderRadius: '6px',
        height: 'fit-content',
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}>
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
            MenuListProps={{
              'aria-labelledby': 'basic-button-workspaces'
            }}
          >
            <MenuItem>
              <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
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
            <MenuItem>
              <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
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
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Button sx={{ color: 'text.primary' }} startIcon={<AddCardIcon />}>Add New Card</Button>
        <Tooltip title="Drag to move ">
          <DragHandleIcon sx={{ cursor: 'pointer' }}/>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column