import { FileDownload, KeyboardArrowDown } from '@mui/icons-material'
import { Box, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const ButtonExport = ({ text, onClick }) => {
  return (
    <Tooltip title={text}>
      <IconButton
        aria-label={text}
        component="label"
        color="primary"
        sx={{
          border: 1,
          borderColor: blue[300],
          borderRadius: 1,
        }}
        onClick={onClick}
      >
        <FileDownload />
      </IconButton>
    </Tooltip>
  )
}

export const ButtonImport = ({ to, text }) => {
  return (
    <Link to={to}>
      <Button variant="outlined" sx={{ paddingY: 1 }}>
        {text}
      </Button>
    </Link>
  )
}

export const InputExportExcel = ({ handleFile, name, uploadRecords }) => {
  return (
    <Box
      justifyContent="bottom"
      component="label"
      variant="outlined"
      sx={{
        paddingX: 12,
        paddingY: 8,
        border: 2,
        borderColor: grey[300],
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'bottom',
        cursor: 'pointer',
        gap: 10,
        borderStyle: 'dashed',
        '&:hover': {
          borderColor: grey[400],
        },
        backgroundColor: grey[100],
      }}
    >
      {name ? name : 'Seleccionar archivo'}
      <input type="file" hidden onChange={(e) => handleFile(e)} />
      <Button
        type="button"
        variant="contained"
        sx={{ paddingY: 1 }}
        onClick={uploadRecords}
        disabled={!name}
      >
        Subir archivo 
      </Button>
    </Box>
  )
}

export const ButtonExportProductos = ({ exportSoles, exportDolares }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Button
        sx={{ height: '100%' }}
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        <FileDownload />
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            exportSoles()
            handleClose()
          }}
          disableRipple
        >
          Exportar (S/.)
        </MenuItem>
        <MenuItem
          onClick={() => {
            exportDolares()
            handleClose()
          }}
          disableRipple
        >
          Exportar ($)
        </MenuItem>
      </Menu>
    </>
  )
}
