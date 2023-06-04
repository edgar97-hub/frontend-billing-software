import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import Notification from '../../toolsForm/Notification'
import ConfirmDialog from '../../toolsForm/ConfirmDialog'
import axios from 'axios'

const defaultTheme = createTheme()

export default function SignInSide() {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const documentNumberRef = React.useRef()
  const passRef = React.useRef()
  const [credSave, setCredSave] = React.useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    try {
      setLoading(true)
      var values = {
        email: data.get('email'),
        password: data.get('password'),
      }
      console.log(values)
      var localhost = 'http://localhost:5001'
      var remoteServer = 'https://node-app-fiber-peru.onrender.com'

     
      var response = await axios.post(localhost + '/auth/login', values)
      console.log(response.data)
      if (response.data.token) {
        setNotify({
          isOpen: true,
          message: 'guardado con éxito',
          type: 'success',
        })
        localStorage.setItem('token', response.data.token)
        navigate('/usuarios')
      } else {
        setNotify({
          isOpen: true,
          message: 'Credenciales incorrectas',
          type: 'error',
        })
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* <CssBaseline /> */}
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        <Grid item xs={12} sm={12} md={15} component={Paper}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#077cd6' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                inputRef={documentNumberRef}
                size="small"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                sx={{
                  '& label.Mui-focused': {
                    color: '#077cd6',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#077cd6',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      //borderColor: '#d60cb8',
                    },
                    '&:hover fieldset': {
                      //borderColor: '#d60cb8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#077cd6',
                    },
                  },
                }}
              />
              <TextField
                inputRef={passRef}
                size="small"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                  '& label.Mui-focused': {
                    color: '#077cd6',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#077cd6',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      //borderColor: '#d60cb8',
                    },
                    '&:hover fieldset': {
                      //borderColor: '#d60cb8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#077cd6',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontWeight: '600 !important',
                  background: 'linear-gradient(73deg, #077cd6, #61aae3)',
                  '&:hover': {
                    backgroundColor: '#077cd6',
                  },
                }}
              >
                Ingresar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </ThemeProvider>
  )
}
