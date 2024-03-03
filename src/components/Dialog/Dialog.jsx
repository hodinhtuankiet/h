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
          <TextField variant="outlined" label="Password"></TextField>
          <TextField variant="outlined" label="Email"></TextField>
          <TextField variant="outlined" label="Phone"></TextField>
          <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
          <Button color="primary" variant="contained">Submit</Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="success" variant="contained">Yes</Button>
        <Button onClick={() => setOpenPopup(false)} color="error" variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Popup
