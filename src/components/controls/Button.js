import React from 'react';
//import { makeStyles } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

import { Button as MuiButton } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    //margin: theme.spacing(0.5),
    margin: "3px",
  },
  label: {
    textTransform: 'none',
  },
}));

export default function Button(props) {
  const { loading, text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      //color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
      {loading}
    </MuiButton>
  );
}
