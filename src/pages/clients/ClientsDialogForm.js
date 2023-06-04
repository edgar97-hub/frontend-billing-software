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
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import TextField from '@mui/material/TextField'

const initialFValues = {
  id: 0,
  fullName: '',
  clientType: '',
  address: '',
  district: '',
  startDate: new Date(),
  documentType: '',
  documentNumber: '',
  telephone: '',
  email: '',
  plan: '',
  observations: '',
  state: false,
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
    console.log(values, errors)

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
        //alignItems="center"
      >
        <Grid
          item
          xs={6}
          // md={2}
          // lg={7}
          style={
            {
              //marginTop: 10,
              //border: '1px solid blue',
            }
          }
        >
          <Controls.Input
            fullWidth
            name="fullName"
            size="small"
            label="Nombre completo"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            name="clientType"
            size="small"
            label="Tipo cliente"
            value={values.clientType}
            onChange={handleInputChange}
            error={errors.clientType}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            label="Direccion"
            name="address"
            size="small"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            label="Distrito"
            name="district"
            size="small"
            value={values.district}
            onChange={handleInputChange}
            error={errors.district}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.DatePicker
            label="Fecha de inicio"
            name="startDate"
            size="small"
            value={dayjs(values.startDate)}
            onChange={handleInputChange}
            error={errors.startDate}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            label="Tipo documento"
            name="documentType"
            size="small"
            value={values.documentType}
            onChange={handleInputChange}
            error={errors.documentType}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            label="Numero de documento"
            name="documentNumber"
            size="small"
            value={values.documentNumber}
            onChange={handleInputChange}
            error={errors.documentNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            label="telefono"
            name="telephone"
            size="small"
            value={values.telephone}
            onChange={handleInputChange}
            error={errors.telephone}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            label="Correo"
            name="email"
            size="small"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            label="plan-internet"
            name="plan"
            size="small"
            value={values.plan}
            onChange={handleInputChange}
            error={errors.plan}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            label="observaciones"
            name="observations"
            size="small"
            multiline
            rows={4}
            maxRows={4}
            value={values.observations}
            onChange={handleInputChange}
            error={errors.observations}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Checkbox
            fullWidth
            label="Estado"
            name="state"
            size="small"
            value={values.state}
            onChange={handleInputChange}
            error={errors.state}
          />
        </Grid>
        <Grid
          container
          //justifyContent="center"
          direction="row"
          //alignItems="center"
          //spacing={0}
        >
          <Grid
            item
            xs={4}
            style={{
              marginTop: 10,
              marginLeft: 6,
              //border: '1px solid blue',
            }}
          >
            <Controls.Button
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
          <Grid
            item
            xs={4}
            style={{
              marginTop: 10,
              //border: '1px solid blue',
            }}
          >
            <Controls.Button
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
