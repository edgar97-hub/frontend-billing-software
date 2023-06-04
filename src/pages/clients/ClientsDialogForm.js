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

const genderItems = [
  { id: 'male', title: 'Masculino' },
  { id: 'female', title: 'Femenino' },
  { id: 'other', title: 'Otro' },
]

const initialFValues = {
  id: 0,
  fullName: '',
  clientType: '',
  address: '',
  district: '',
  documentType: '',
  documentNumber: '',
  telephone: '',
  email: '',
  plan: '',
  observations: '',
  state: '',
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

    if ('fullName' in fieldValues)
      temp.fullName =
        fieldValues.fullName.length != 0 ? '' : 'Este campo es obligatorio'
    if ('clientType' in fieldValues)
      temp.clientType =
        fieldValues.clientType.length != 0 ? '' : 'Este campo es obligatorio'
    if ('address' in fieldValues)
      temp.address =
        fieldValues.address.length != 0 ? '' : 'Este campo es obligatorio'
    if ('district' in fieldValues)
      temp.district =
        fieldValues.district.length != 0 ? '' : 'Este campo es obligatorio'
    if ('documentType' in fieldValues)
      temp.documentType =
        fieldValues.documentType.length != 0 ? '' : 'Este campo es obligatorio'
    if ('documentNumber' in fieldValues)
      temp.documentNumber =
        fieldValues.documentNumber.length != 0
          ? ''
          : 'Este campo es obligatorio'
    if ('telephone' in fieldValues)
      temp.telephone =
        fieldValues.telephone.length != 0 ? '' : 'Este campo es obligatorio'
    if ('email' in fieldValues)
      temp.email =
        fieldValues.email.length != 0 ? '' : 'Este campo es obligatorio'
    if ('plan' in fieldValues)
      temp.plan =
        fieldValues.plan.length != 0 ? '' : 'Este campo es obligatorio'
    if ('observations' in fieldValues)
      temp.observations =
        fieldValues.observations.length != 0 ? '' : 'Este campo es obligatorio'
    if ('state' in fieldValues)
      temp.state =
        fieldValues.state.length != 0 ? '' : 'Este campo es obligatorio'

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
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={6} sm={10}>
           
          <Controls.Input
            name="fullName"
            size="small"
            label="Nombre completo"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            // sx={{
            //   margin: 1,
            // }}
          />
          <Controls.Input
            name="clientType"
            size="small"
            label="Tipo cliente"
            value={values.clientType}
            onChange={handleInputChange}
            error={errors.clientType}
            // sx={{
            //   margin: 1,
            // }}
          />
          <Controls.Input
            label="Direcion"
            name="address"
            size="small"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
            sx={{
              margin: 1,
            }}
          />
          <Controls.Input
            label="Distrito"
            name="district"
            size="small"
            value={values.district}
            onChange={handleInputChange}
            error={errors.district}
            sx={{
              margin: 1,
            }}
          /> 
          <Controls.DatePicker
            label="Fecha de inicio"
            name="startDate"
            size="small"
            value={values.startDate}
            onChange={handleInputChange}
            error={errors.startDate}
            sx={{
              margin: 1,
            }}
          />
          <Controls.Input
            label="Tipo documento"
            name="documentType"
            size="small"
            value={values.documentType}
            onChange={handleInputChange}
            error={errors.documentType}
            sx={{
              margin: 1,
            }}
          />
          <Controls.Input
            label="Numero de documento"
            name="documentNumber"
            size="small"
            value={values.documentNumber}
            onChange={handleInputChange}
            error={errors.documentNumber}
            sx={{
              margin: 1,
            }}
          />
          <Controls.Input
            label="telefono"
            name="telephone"
            size="small"
            value={values.telephone}
            onChange={handleInputChange}
            error={errors.telephone}
            sx={{
              margin: 1,
            }}
          />
          <Controls.Input
            label="Correo"
            name="email"
            size="small"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
            sx={{
              margin: 1,
            }}
          />
          <Controls.Input
            label="plan-internet"
            name="plan"
            size="small"
            value={values.plan}
            onChange={handleInputChange}
            error={errors.plan}
            sx={{
              margin: 1,
            }}
          />
          <Controls.Input
            label="observaciones"
            name="observations"
            size="small"
            value={values.observations}
            onChange={handleInputChange}
            error={errors.observations}
            sx={{
              margin: 1,
            }}
          />
          <Controls.Checkbox
            label="Estado"
            name="state"
            size="small"
            value={values.state}
            onChange={handleInputChange}
            error={errors.state}
            sx={{
              margin: 1,
            }}
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
                  <CircularProgress
                    size={40}
                    style={{ position: 'absolute' }}
                  />
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
        </Grid>
      </Grid>
    </Form>
  )
}
