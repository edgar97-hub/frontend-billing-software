import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Controls from '../../components/controls/Controls'
import { useForm, Form } from '../../components/toolsForm/useForm'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'

const genderItems = [
  { id: 'male', title: 'Masculino' },
  { id: 'female', title: 'Femenino' },
  { id: 'other', title: 'Otro' },
]

const initialFValues = {
  id: 0,
  planType: '',
  description: '',
  price: '',
  mbps: '',
}

export default function UserDialogForm(props) {
  const {
    addOrEdit,
    recordForEdit,
    roles,
    loading,
    getAllCompaniesAndBranches,
  } = props
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const validate = (fieldValues = values) => {
    let temp = { ...errors }

    if ('planType' in fieldValues)
      temp.planType =
        fieldValues.planType.length != 0 ? '' : 'Este campo es obligatorio'
    if ('description' in fieldValues)
      temp.description =
        fieldValues.description.length != 0 ? '' : 'Este campo es obligatorio'
    if ('price' in fieldValues)
      temp.price =
        fieldValues.price.length != 0 ? '' : 'Este campo es obligatorio'
    if ('mbps' in fieldValues)
      temp.mbps =
        fieldValues.mbps.length != 0 ? '' : 'Este campo es obligatorio'

    setErrors({
      ...temp,
    })

    if (fieldValues == values) return Object.values(temp).every((x) => x == '')
  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate)

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('data');
    if (validate()) {
      addOrEdit(values, resetForm)
    }
  }

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit,
      })
    }
  }, [recordForEdit])

  return (
    // <Form onSubmit={handleSubmit}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Controls.Input
            name="planType"
            size="small"
            label="tipo plan"
            value={values.planType}
            onChange={handleInputChange}
            error={errors.planType}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="description"
            size="small"
            label="descripcion"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
            // sx={{
            //   margin: 1,
            // }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="precio"
            name="price"
            size="small"
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
            // sx={{
            //   margin: 1,
            // }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="mbps"
            name="mbps"
            size="small"
            value={values.mbps}
            onChange={handleInputChange}
            error={errors.mbps}
            // sx={{
            //   margin: 1,
            // }}
          />
        </Grid>
        <Grid container justifyContent="center" direction="row" alignItems="center" spacing={2}>
          <Grid item xs={3}>
            <Controls.Button
              type="submit"
              text="Submit"
              size="small"
              loading={
                loading && (
                  <CircularProgress
                    size={40}
                    style={{ position: 'absolute' }}
                  />
                )
              }
              disabled={loading}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Button
              type="submit"
              text="Submit"
              size="small"
              loading={
                loading && (
                  <CircularProgress
                    size={40}
                    style={{ position: 'absolute' }}
                  />
                )
              }
              disabled={loading}
            />
          </Grid>
          {/* <Controls.Button
            text="Reset"
            size="small"
            color="default"
            onClick={resetForm}
          /> */}
        </Grid>
        {/* <Grid item xs={6} sm={10} ml={5}>
        <Controls.Input
          name="planType"
          size="small"
          label="tipo plan"
          value={values.planType}
          onChange={handleInputChange}
          error={errors.planType}
          // sx={{
          //   margin: 1,
          // }}
        />
        <Controls.Input
          name="description"
          size="small"
          label="descripcion"
          value={values.description}
          onChange={handleInputChange}
          error={errors.description}
          // sx={{
          //   margin: 1,
          // }}
        />
        <Controls.Input
          label="precio"
          name="price"
          size="small"
          value={values.price}
          onChange={handleInputChange}
          error={errors.price}
          // sx={{
          //   margin: 1,
          // }}
        />
        <Controls.Input
          label="mbps"
          name="mbps"
          size="small"
          value={values.mbps}
          onChange={handleInputChange}
          error={errors.mbps}
          // sx={{
          //   margin: 1,
          // }}
        /> 
        <div
          style={{
            margin: 1,
          }}
        >
          <Controls.Button
            style={{
              margin: 3,
            }}
            type="submit"
            text="Submit"
            size="small"
            loading={
              loading && (
                <CircularProgress size={40} style={{ position: 'absolute' }} />
              )
            }
            disabled={loading}
          />
          <Controls.Button
            style={{
              margin: 3,
            }}
            text="Reset"
            size="small"
            color="default"
            onClick={resetForm}
          />
        </div>
      </Grid>*/}
      </Grid>
    </Box>
    // </Form>
  )
}
