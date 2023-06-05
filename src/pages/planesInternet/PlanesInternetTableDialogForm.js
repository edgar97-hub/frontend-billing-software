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
  const { addOrEdit, recordForEdit, loading } = props
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid
       container
        spacing={2}
        direction="column"
        justifyContent="center"
      >
        <Grid item xs={6}>
          <Controls.Input
          fullWidth
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
          fullWidth
            name="description"
            size="small"
            label="descripcion"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
          fullWidth
            label="precio"
            name="price"
            size="small"
            type="number"
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
          fullWidth
            label="mbps"
            name="mbps"
            size="small"
            type="number"
            value={values.mbps}
            onChange={handleInputChange}
            error={errors.mbps}
          />
        </Grid>
        <Grid
          container
          justifyContent="center"
          direction="row"
          alignItems="center"
          //spacing={5}
        >
          <Grid item xs={2} md={4} lg={4}>
            <Controls.Button
              style={{
                margin: 10,
              }}
              type="submit"
              text="Enviar"
              size="small"
              onClick={handleSubmit}
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
          <Grid item xs={6} md={9} lg={3}>
            <Controls.Button
              style={{
                margin: 10,
              }}
              text="Reset"
              size="small"
              color="default"
              onClick={resetForm}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
