import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { Button, TextField } from '@mui/material'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

function ListColumns({ columns, funcCreateNewColumn, funcCreateNewCard, deleteColumnDetails }) {
  const [openAddNewColumn, setOpenNewColumn] = useState(false)
  // When click , it's will switch true -> false or false -> true
  const toggleOpenNewColumn = () => setOpenNewColumn(!openAddNewColumn)

  const [newColumnTitle, setnewColumnTitle] = useState('')

  const AddNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Title Column Do Not Empty !', { position: 'bottom-left' })
      return
    }
    // New Data of Column
    const newColumnData = {
      title: newColumnTitle
    }
    // function funcCreateNewColumn được gọi props từ BoardContent tới
    await funcCreateNewColumn(newColumnData)

    // close Box Add New Column
    toggleOpenNewColumn()
    setnewColumnTitle('')
  }


  return (
    // trong TH này là list nằm nghang nên dùng horizontal list sorting
  // SortableContext yêu cầu items là một dạng mảng ['id-1,'id-2'] chứ không phải [{id:'id-1}'], [{id:'id-2}']
  // Nếu không đúng vẫn kéo được nhưng ko có animations
    <SortableContext items={columns?.map( c => c._id )} strategy={ horizontalListSortingStrategy }>
      <Box
        sx={{
          // background kế thừa từ thẻ cha ở ngoài
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          overflowX: 'auto',
          display: 'flex',
          overflowY: 'hidden',
          // margin left thanh scroll ra 2px
          '&::-webkit-scrollbar-track': { m: 2 }
        }}>

        {/* map dữ liệu đổ ra columns  */}
        {/* Khi chỉ có 1 tham số thì không cần (column) || => { } chuyền thành => () coi như là có return  */}
        {/* Thường thì có return thì trước nó sẽ là xử lí gì gì đó , hoặc return 1 nhiều cái thì có dấu () không thì bỏ lun   */}
        {/* columns: là truyền một props để truyền tiếp đến file Column.jsx tiếp theo  */}
        {columns.map(column => <Column key={column._id}
          column={column}
          funcCreateNewCard={funcCreateNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />)}
        {/* Box Add New Card  */}
        {/* Now openAddNewColumn isFalse -> when click Box it will swith to true */}
        {!openAddNewColumn
          ? <Box
            onClick={toggleOpenNewColumn}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              // backgroundColor: (theme) => (theme.colorSchemes.dark.palette.primary.main),
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content'
            }}
          >
            <Button startIcon={ <NoteAddIcon/> }
              sx={{
                width: '100%',
                pr: 4
              }}
            >Add new column</Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p:1,
            borderRadius: '7px',
            height: 'fit-content',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
            display: 'flex',
            flexDirection: 'column',
            gap: 0.1,
            '& > :not(style)': { m: 1, width: '25ch' }
          }}>
            <TextField fullWidth id="outlined-basic"
              label="Add new column"
              type="search"
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              // khi onChange value trong TextField thì gán lại value
              onChange={(e) => setnewColumnTitle(e.target.value)}
              sx={{
                minWidth: 100,
                '& label': { color: 'primary' },
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={AddNewColumn}
                variant='contained'
                size='small'
                fontSize='12px'
                sx={{
                  color: 'primary.main', // Đặt màu chữ thành màu đen
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#636e72' : 'white'), // Đặt màu nền thành màu xám
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'primary.main'),
                  '&:hover': {
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#ebecf0')
                  },
                  typography: {
                    fontSize: '14px'
                    // textTransform: 'none'
                    // Đặt kích thước chữ là 12px
                  }
                }}
              >
              Add Column
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
                onClick={toggleOpenNewColumn}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns