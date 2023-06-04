import React, { useState, useEffect } from 'react'
import UserDialogForm from './ClientsDialogForm'
import useTable from '../../components/toolsForm/useTable'
import Controls from '../../components/controls/Controls'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Popup from '../../components/toolsForm/Popup'
import Notification from '../../components/toolsForm/Notification'
import ConfirmDialog from '../../components/toolsForm/ConfirmDialog'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import InputAdornment from '@mui/material/InputAdornment'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { insert, update, remove } from './apis'
import { getDate, dateFormat, getDateTime } from '../../services/service'
import { Button, Grid } from '@mui/material'
import { ButtonExport, ButtonImport } from '../../components/elements/Button'
import { Typography } from '@mui/material'
import * as XLSX from 'xlsx'

const useStyles = makeStyles((theme) => ({
  roots: {
    width: '100%',
    //border: '3px solid forestgreen',
    marginLeft: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'center',
    //gap:5,
    marginLeft: '40px',
    marginRight: '40px',
    //overflow: "scroll",
    //scrollbarColor: "red orange",
  },

  root: {
    width: '70%',
    marginLeft: '40%',
    //marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    //border: '3px solid forestgreen',
    marginLeft: '20%',
    //marginRight: '40px',
  },
  table: {
    minWidth: 900,
  },
}))

const headCells = [
  { id: 'fullName', label: 'Nombre completo' },
  { id: 'clientType', label: 'Tipo cliente' },
  { id: 'address', label: 'Dirección' },
  { id: 'district', label: 'Distrito' },
  { id: 'startDate', label: 'Fecha inicio' },
  { id: 'documentType', label: 'Tipo documento' },
  { id: 'documentNumber', label: 'Numero documento' },
  { id: 'telephone', label: 'Telefono' },
  { id: 'email', label: 'Correo' },
  // { id: 'voucherType', label: 'Tipo comprobante' },
  { id: 'Plan', label: 'Plan' },
  { id: 'observations', label: 'Observaciones' },
  { id: 'state', label: 'Estado' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

export default function UserTable() {
  const classes = useStyles()
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState([])
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items
    },
  })
  const [openPopup, setOpenPopup] = useState(false)

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })

  const [loading, setLoading] = useState(false)

  function getData() {
    var localhost = 'http://localhost:5001'
    var remoteServer = 'https://node-app-fiber-peru.onrender.com'
    var token = localStorage.getItem('token')

    // axios
    //   .get(localhost + '/api/v1/planes-internet', value{
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response)
    //     if (response.data) {
    //       setRecords(response.data)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    axios
      .get(localhost + '/api/v1/clients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        if (response.data) {
          setRecords(response.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn)

  const handleSearch = (e) => {
    let target = e.target
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          )
      },
    })
  }

  async function addOrEdit(value, resetForm) {
    setLoading(true)
    console.log(value)
    try {
      if (value.id == 0) {
        value.startDate = getDate(value.startDate.$d)
        var result = await insert(value)
        if (result.error) throw new EvalError(result.error)
      } else {
        value.startDate = getDate(value.startDate.$d)
        var result = await update(value)
        if (result.error) throw new EvalError(result.error)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
      }
      setLoading(false)
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
      setNotify({
        isOpen: true,
        message: 'guardado con éxito',
        type: 'success',
      })
      getData()
    } catch (error) {
      setNotify({
        isOpen: true,
        message: error,
        type: 'error',
      })
    }
  }

  const recordEdit = (item) => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  async function onDelete(value) {
    setLoading(true)
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    try {
      var result = await remove(value)
      if (result.error) throw new EvalError(result.error)
      getData()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'success',
    })
  }
  const exportExcel = () => {
    const clientesExport = recordsAfterPagingAndSorting().map((cliente) => {
      return {
        NOMBRE: cliente.fullName,
        'TIPO CLIENTE': cliente.clientType,
        address: cliente.address,
        DISTRITO: cliente.district,
        'FECHA INICIO': cliente.startDate,
        'TIPO DOCUMENTO': cliente.documentNumber,
        TELÉFONO: cliente.telephone,
        CORREO: cliente.email,
        'PLAN INTERNT': cliente.plan,
        OBSERVACIONES: cliente.observations,
        ESTADO: cliente.state,
      }
    })
    console.log(clientesExport)
    const fileName = `Clientes_${getDateTime()}`
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(clientesExport)
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes')
    XLSX.writeFile(wb, `${fileName}.xlsx`)
  }

  return (
    <Box>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h1"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 500, fontSize: '30px' }}
            >
              Clientes
            </Typography>
          </Grid>
          <Grid container item xs={12} sm={8} justifyContent="end">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                type="button"
                onClick={() => {
                  setOpenPopup(true)
                  setRecordForEdit(null)
                }}
              >
                Nuevo Cliente
              </Button>
              <ButtonImport to="/import" text="importar clientes" />
              <ButtonExport text="Exportar clientes" onClick={exportExcel} />
            </Box>
          </Grid>
        </Grid>
        <Controls.Input
          size="small"
          variant="filled"
          sx={{
            //width: { xs: 400, sm: 280, md: 600, lg: 700 },
            width: '100%',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <TblContainer className={classes.table} size="small">
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting()?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.clientType}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.district}</TableCell>
                <TableCell>{dateFormat(item.startDate)}</TableCell>
                <TableCell>{item.documentType}</TableCell>
                <TableCell>{item.documentNumber}</TableCell>
                <TableCell>{item.telephone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.plan}</TableCell>
                <TableCell>{item.observations}</TableCell>
                <TableCell>
                  {item.state === true ? 'Activo' : 'Inactivo'}
                </TableCell>

                <TableCell
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Controls.ActionButton
                    onClick={async () => {
                      recordEdit(item)
                    }}
                  >
                    <EditIcon sx={{ color: '#888e8b' }} />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Estás seguro de eliminar este registro?',
                        subTitle: 'No podrá deshacer esta operación',
                        onConfirm: () => {
                          onDelete(item)
                        },
                      })
                    }}
                  >
                    <DeleteIcon sx={{ color: '#888e8b' }} />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Box>
      <Popup
        title="Formulario de cliente"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserDialogForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          loading={loading}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Box>
  )
}
