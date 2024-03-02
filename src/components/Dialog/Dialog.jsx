import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'
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

  return (
    <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        ádasdas
      </DialogTitle>
    </Dialog>
  )
}

export default Popup
