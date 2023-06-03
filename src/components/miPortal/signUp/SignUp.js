import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Notification from '../../../toolsForm/Notification'
import ConfirmDialog from '../../../toolsForm/ConfirmDialog'

const defaultTheme = createTheme()

export default function SignUp() {
  const documentTypeRef = React.useRef()
  const documentNumberRef = React.useRef()
  const passRef = React.useRef()
  const confirmPasswordRef = React.useRef()
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })


  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (data.get('password') != data.get('confirmPassword')) {
      alert('la contraseña no coicide')
      return false
    }
    try {
      setLoading(true)
      var details = {
        documentType: data.get('documentType'),
        documentNumber: data.get('documentNumber'),
        email: data.get('email'),
        password: data.get('password'),
      }
      console.log(details)
      // const response = await axios.post(
      //   'http://localhost:5001' + '/api/v1/public/register',
      //   details
      // )
      var localhost = "http://localhost:5001"
      var remoteServer = "https://node-app-fiber-peru.onrender.com"
      const loggedInResponse = await fetch(
        remoteServer + '/api/v1/public/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(details),
        }
      )
      const response = await loggedInResponse.json()

      console.log(response)
      setNotify({
        isOpen: true,
        message: 'guardado con éxito',
        type: 'success',
      })
      if (response.success) {
        navigate("/mi-portal")

      }


    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }





  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#d60cb8' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar usuario
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    '& label.Mui-focused': {
                      color: '#d60cb8',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#d60cb8',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&:hover fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#d60cb8',
                      },
                    },
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Tipo de documento
                  </InputLabel>
                  <Select
                    inputRef={documentTypeRef}
                    labelId="demo-simple-select-label"
                    label="Tipo de documento"
                    name="documentType"
                  // onChange={handleChange}
                  >
                    <MenuItem value={'DNI'}>DNI</MenuItem>
                    <MenuItem value={'RUC'}>RUC</MenuItem>
                    <MenuItem value={'CARNET DE EXTRANJERIA'}>
                      CARNET DE EXTRANJERIA
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={documentNumberRef}
                  size="small"
                  autoComplete="given-name"
                  name="documentNumber"
                  required
                  fullWidth
                  label="Numero de documento"
                  sx={{
                    '& label.Mui-focused': {
                      color: '#d60cb8',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#d60cb8',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&:hover fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#d60cb8',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //inputRef={documentNumberRef}
                  size="small"
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  label="Correo"
                  sx={{
                    '& label.Mui-focused': {
                      color: '#d60cb8',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#d60cb8',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&:hover fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#d60cb8',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  inputRef={passRef}
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  sx={{
                    '& label.Mui-focused': {
                      color: '#d60cb8',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#d60cb8',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&:hover fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#d60cb8',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={confirmPasswordRef}
                  size="small"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  type="password"
                  sx={{
                    '& label.Mui-focused': {
                      color: '#d60cb8',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#d60cb8',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&:hover fieldset': {
                        //borderColor: '#d60cb8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#d60cb8',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontWeight: '600 !important',
                background: 'linear-gradient(73deg, #d60cb8, #fc59e3)',
                '&:hover': {
                  backgroundColor: '#d60cb8',
                },
              }}
            >
              Continuar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/mi-portal"
                  variant="body2"
                  sx={{
                    color: '#d60cb8',
                  }}
                >
                  ¿Ya tienes una cuenta? Iniciar sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
    </ThemeProvider>
  )
}
