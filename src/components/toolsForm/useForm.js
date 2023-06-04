import React, { useState } from 'react'
//import { makeStyles } from '@material-ui/core';
import { makeStyles } from '@mui/styles'

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
    if (validateOnChange) validate({ [name]: value })
  }

  const resetForm = () => {
    setValues(initialFValues)
    setErrors({})
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid rgb(177, 175, 175)',
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    margin: 0,  
    '& .MuiFormControl-root': {
      //width: '100%',
      margin: '5px',
      border: '1px solid rgb(177, 175, 175)',
      // margin: theme.spacing(1),
    },
  },
}))

export function Form(props) {
  const classes = useStyles()
  const { children, ...other } = props
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  )
}
