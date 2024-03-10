import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, FormControlLabel, Checkbox, Button, Stack, DialogActions } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px'
  }
}))

function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props
  const classes = useStyles()
  const [open, openchange]= useState(false)
  const functionopenpopup=() => {
    openchange(true)
  }
  const closepopup=() => {
    openchange(false)
  }
  return (
    <Dialog style={{textAlign:'center' }} open={openPopup} fullWidth maxWidth="sm" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        {title}
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
        <Stack spacing={2} margin={2}>
          <TextField variant="outlined" label="Username"></TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'white' }} color="primary" variant="contained">
          Yes
        </Button>
        <Button onClick={() => setOpenPopup(false)} sx={{ color: 'white' }} color="error" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Popup
