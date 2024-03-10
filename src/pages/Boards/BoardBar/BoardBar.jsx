import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { capitalizeFirstLetter } from '~/utils/capitalize-first-letter'
import { useState } from 'react'
import Popup from './Popup'
// sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ) }}
const MENU_STYLES = {
  color: 'primary.main',
  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
  paddingX: '5px',
  // icon ở trong chip
  '& .MuiSvgIcon-root' : {
    color: 'primary.main'
  },
  '&:hover' : {
    color: 'primary.50'
  }
}

function BoardBar({ board }) {
  // const board = board.board
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <Box px={2} sx={{
      width: '100%',
      // height: { theme.trello.}
      height: (theme) => theme.trello.boardBarHeight,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 1,
      overflowX: 'auto',
      borderTop: '1px solid #dfe6e9'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {/* chip này vừa có icon vừa có labal (đơn giản thế thôi) */}
        <Tooltip title={board?.description}>
          <Chip sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label= {board?.title}
            clickable
          />
        </Tooltip>
        {/* chip 2 */}
        <Chip sx={MENU_STYLES}
          icon={<LockOpenIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        {/* chip 3 */}
        <Chip sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        {/* chip 4 */}
        <Chip sx={MENU_STYLES}
          icon={<NetworkCheckIcon />}
          label="Automation"
          clickable
        />
        {/* chip 5 */}
        <Chip sx={MENU_STYLES}
          icon={<FilterAltIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Button onClick={() => setOpenPopup(true)} variant="outlined" startIcon={<GroupAddIcon/>} >
            Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            '& .MuiAvatar-root': {
              width: 33,
              height: 34
            }
          }}
        >
          <Tooltip title="trungquandev">
            <Avatar alt="Remy Sharp" src="https://lh4.googleusercontent.com/WSGZnJHFeJPasjNCsH0GlDlfgN85em5PmDR_MRw5lQxz58esADMU7l3qP6Rq-83VIB8-vuv3eaMKCgDsbqTZMBnL1g3DrHlmxXAM4mnq8oXApXe5xDjQVgbt7hzllN1_RqPadVOSgkkDEPq5XQ" />
          </Tooltip>
          <Tooltip title="Travis Howard">
            <Avatar alt="Travis Howard" src="https://watermark.lovepik.com/photo/20211203/large/lovepik-smiling-man-picture_501490289.jpg" />
          </Tooltip>
          <Tooltip title="Agnes Walker">
            <Avatar alt="Agnes Walker" src="data:image/jpeg;base64,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" />
          </Tooltip>
          <Tooltip title="Trevor Henderson">
            <Avatar alt="Trevor Henderson" src="https://image-us.24h.com.vn/upload/3-2018/images/2018-08-02/1533222821-797-chinh-tri-gia-my-khon-don-vi-anh-khoa-than-cua-nguoi-yeu-cu-chinh-tri-gia-1533196004-width618height410.jpg" />
          </Tooltip>
          <Tooltip title="Travis Howard">
            <Avatar alt="Trevor Henderson" src="https://vcdn-vnexpress.vnecdn.net/2020/12/31/106817575-1609350400136-Mike-M-8590-5490-1609400433.jpg" />
          </Tooltip>
          <Tooltip title="Travis Howdard">
            <Avatar alt="Travis Howard" src="https://cafebiz.cafebizcdn.vn/162123310254002176/2020/9/15/1-1600135860402749216525.png" />
          </Tooltip>
          <Tooltip title="Travis Howdard">
            <Avatar alt="Travis Howard" src="https://cafebiz.cafebizcdn.vn/162123310254002176/2020/9/15/1-1600135860402749216525.png" />
          </Tooltip>
          <Tooltip title="Travis Howdard">
            <Avatar alt="Travis Howard" src="https://cafebiz.cafebizcdn.vn/162123310254002176/2020/9/15/1-1600135860402749216525.png" />
          </Tooltip>
          <Tooltip title="Travis Howdard">
            <Avatar alt="Travis Howard" src="https://cafebiz.cafebizcdn.vn/162123310254002176/2020/9/15/1-1600135860402749216525.png" />
          </Tooltip>
          <Tooltip title="Travis Howdard">
            <Avatar alt="Travis Howard" src="https://cafebiz.cafebizcdn.vn/162123310254002176/2020/9/15/1-1600135860402749216525.png" />
          </Tooltip>
          <Tooltip title="Travis Howdard">
            <Avatar alt="Travis Howard" src="https://cafebiz.cafebizcdn.vn/162123310254002176/2020/9/15/1-1600135860402749216525.png" />
          </Tooltip>
          <Tooltip title="Travis Howdard">
            <Avatar alt="Travis Howard" src="https://cafebiz.cafebizcdn.vn/162123310254002176/2020/9/15/1-1600135860402749216525.png" />
          </Tooltip>
        </AvatarGroup>
      </Box>
      <Popup
        title="Invite Person"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {/* <EmployeeForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit} /> */}
      </Popup>
    </Box>
  )
}

export default BoardBar