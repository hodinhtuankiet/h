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
  DialogActions,
  Box,
  Grid,
  CardContent,
  Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { updateAPI } from '~/apis'

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

  const updateCard = async () => {
    try {
      const response = await updateAPI(card._id, { title: titleValue, description: descriptionValue })

      // Call the callback function to update card data in the Card component
      props.updateCardData(response)

      // Close the popup
      setOpenPopup(false)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Card not found:', error)

        // Extract and display a more informative error message to the user
        const errorMessage = error.response.data || 'Card not found. Please refresh the page or try again later.'
        alert(errorMessage)
      } else {
        console.error('Error updating card details:', error)
      }
    }
  }


  return (
    <Dialog
      style={{ textAlign: 'center' }}
      open={openPopup}
      fullWidth
      maxWidth="md"
      // maxHeight="sx"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* First Grid item (7 parts) */}
            <Grid container spacing={2}>
              {/* First Grid item (8 parts) */}
              <Grid item xs={9} sx={{ display: 'flex', flexDirection: 'column', width: '720px', justifyContent: 'space-between', '& > *': { marginBottom: '25px' } }}>
                <TextField
                  variant="outlined"
                  label="Title Card"
                  value={titleValue}
                  onChange={handleTitleChange}
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  label="Description Card"
                  value={descriptionValue}
                  onChange={handleDescriptionChange}
                  fullWidth
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked color="primary" />}
                  label="Agree terms & conditions"
                />
              </Grid>

              {/* Second Grid item (4 parts) */}
              <Grid item xs={3}
                sx={{ display: 'flex',
                  flexDirection: 'column',
                  width: '620px',
                  justifyContent: 'space-between',
                  '& > *': { marginBottom: '20px' } }}>
                <CardContent sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 },
                  height: 50,
                  border: '1px solid transparent', // Set a default border
                  borderRadius: '7px',
                  '&:hover': {
                    borderColor: '#bdc3c7',
                    cursor: 'pointer'
                    // Change border color on hover
                  },
                  color: 'white',
                  borderColor: '#353b48', // Set border color
                  borderStyle: 'solid', // Set border style
                  bgcolor: '#353b48',
                  textAlign: 'left'
                }}>
                  {/* Title Card  */}
                  <Typography>Join</Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {card?.description}
                  </Typography> */}
                </CardContent>

              </Grid>
            </Grid>

          </Box>


          {/* <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button> */}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => updateCard()} sx={{ color: 'white' }} color="primary" variant="contained">
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
