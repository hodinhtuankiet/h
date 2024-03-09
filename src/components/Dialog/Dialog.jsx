import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  DialogActions
} from '@mui/material'
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
  const { title, openPopup, setOpenPopup, card } = props
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')

  useEffect(() => {
    setTitleValue(card?.title || '')
    setDescriptionValue(card?.description || '')
  }, [card])

  const classes = useStyles()

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value)
  }

  const handleSubmit = () => {
    // Add logic to handle form submission
    // You can use titleValue and descriptionValue here
  }

  return (
    <Dialog
      style={{ textAlign: 'center' }}
      open={openPopup}
      fullWidth
      maxWidth="sm"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            variant="outlined"
            label="Title Card"
            value={titleValue}
            onChange={handleTitleChange}
          />
          <TextField
            variant="outlined"
            label="Description Card"
            value={descriptionValue}
            onChange={handleDescriptionChange}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
            label="Agree terms & conditions"
          />
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="success" variant="contained" onClick={handleSubmit}>
          Yes
        </Button>
        <Button onClick={() => setOpenPopup(false)} color="error" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Popup
