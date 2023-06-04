import React from 'react'
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
// } from '@material-ui/core';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material'
import Controls from '../controls/Controls'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
const useStyles = makeStyles((theme) => ({
  dialog: {
    //border: '3px solid rgb(177, 175, 175)',

   
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogAction: {
    '& .MuiDialogActions-spacing': {
      //width: '100%',
      //border: '1px solid rgb(177, 175, 175)',
    },

  },
  titleIcon: {
   // backgroundColor: 'rgb(177, 175, 175)',
    //color: 'rgb(177, 175, 175)',
    '&:hover': {
      //backgroundColor: theme.palette.secondary.light,
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '6rem',
      color: '#c91607  ',

    },
  },
  
}))

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props
  const classes = useStyles()

  return (
    <Dialog
      open={confirmDialog.isOpen}
      className={classes.dialog}
      onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton  className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text="No"
          //color="default"
          variant="text"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button
          text="Si"
          //color="secondary"
          variant="text"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  )
}
