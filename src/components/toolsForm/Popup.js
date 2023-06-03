import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import Controls from '../controls/Controls';
// import { makeStyles } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
//import { makeStyles } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    paddingRight: 20,
    // border: "5px solid rgb(177, 175, 175)",
    // width: "50%",
    // [theme.breakpoints.down('sm')]: {
    //   width: '80%',
    // },
    // [theme.breakpoints.up('sm')]: {
    //   width: '60%',
    // },
    // [theme.breakpoints.up('md')]: {
    //   width: '50%',
    // },
    // [theme.breakpoints.up('lg')]: {
    //   width: '50%',
    // },
  },
  dialogTitle: {
    paddingRight: '0px',
  },
}));

// const classes = (theme) => ({
//   dialogWrapper: {
//     paddingRight: 20,
//     // border: "5px solid rgb(177, 175, 175)",
//     // width: "50%",
//     [theme.breakpoints.down("sm")]: {
//       width: "80%",
//     },
//     [theme.breakpoints.up("sm")]: {
//       width: "60%",
//     },
//     [theme.breakpoints.up("md")]: {
//       width: "50%",
//     },
//     [theme.breakpoints.up("lg")]: {
//       width: "50%",
//     },
//   },
//   dialogTitle: {
//     paddingRight: "0px",
//   },
// });

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      onClose={() => {
        setOpenPopup(!openPopup);
      }}
      // maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
