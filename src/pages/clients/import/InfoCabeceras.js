import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

export const InfoCabeceras = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Información de cabeceras</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography>
            <div>
              <b style={{ textTransform: 'uppercase' }}>Nombre:</b>
              <span style={{ fontSize: '13px' }}>(Requerido)</span>
            </div>
            <p style={{ fontSize: '13px' }}>Tipo de cliente</p>
          </Typography>
          <Typography>
            <div>
              <b style={{ textTransform: 'uppercase' }}>Dirección:</b>{' '}
              <span style={{ fontSize: '13px' }}>(Requerido)</span>
            </div>
            <p style={{ fontSize: '13px' }}>
              Dirección del cliente. Solo se puede ingresar una dirección.
            </p>
          </Typography>
          <Typography>
            <div>
              <b style={{ textTransform: 'uppercase' }}>Fecha de inicio:</b>
              <span style={{ fontSize: '13px' }}>(Requerido)</span>
            </div>
            <p style={{ fontSize: '13px' }}>
              Fecha que el cliente adquirió el servicio
            </p>
          </Typography>
          <Typography>
            <div>
              <b style={{ textTransform: 'uppercase' }}>Número de documento:</b>{' '}
              <span style={{ fontSize: '13px' }}>(Requerido)</span>
            </div>
            <p style={{ fontSize: '13px' }}>
              El número de documento puede ser un DNI o RUC. Si el número
              documento existe en el sistema, se descartara ese cliente.
            </p>
          </Typography>
          <Typography>
            <div>
              <b style={{ textTransform: 'uppercase' }}>Correo electrónico:</b>{' '}
              <span style={{ fontSize: '13px' }}>(Requerido)</span>
            </div>
            <p style={{ fontSize: '13px' }}>
              Correo electrónico del cliente. Solo se puede ingresar un correo
              electrónico.
            </p>
          </Typography>

          <Typography>
            <div>
              <b style={{ textTransform: 'uppercase' }}>Teléfono:</b>
              <span style={{ fontSize: '13px' }}>(Requerido)</span>
            </div>
            <p style={{ fontSize: '13px' }}>
              Teléfono del cliente. Solo se puede ingresar un teléfono.
            </p>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
