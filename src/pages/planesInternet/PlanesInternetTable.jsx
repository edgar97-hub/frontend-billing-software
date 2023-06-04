import React, { useState, useEffect } from 'react'
import UserDialogForm from './PlanesInternetTableDialogForm'
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
    minWidth: 100,
  },
}))

const headCells = [
  { id: 'planType', label: 'tipo plan' },
  { id: 'description', label: 'Descripcion' },
  { id: 'price', label: 'Precio' },
  { id: 'mbps', label: 'Mbps' },
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
      .get(localhost + '/api/v1/planes-internet', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
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
    try {
      if (value.id == 0) {
        var localhost = 'http://localhost:5001'
        var token = localStorage.getItem('token')
        const loggedInResponse = await fetch(
          localhost + '/api/v1/planes-internet',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(value),
          }
        )
        const loggedIn = await loggedInResponse.json()
        console.log(loggedIn)
      } else {
        console.log(value)
        var localhost = 'http://localhost:5001'
        var token = localStorage.getItem('token')
        const loggedInResponse = await fetch(
          localhost + '/api/v1/planes-internet',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(value),
          }
        )
        const loggedIn = await loggedInResponse.json()
        console.log(loggedIn)
        if (loggedIn.error) {
          alert(loggedIn.error)
        }
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
      console.log(value)
      var localhost = 'http://localhost:5001'
      var token = localStorage.getItem('token')
      const loggedInResponse = await fetch(
        localhost + '/api/v1/planes-internet',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(value),
        }
      )
      const loggedIn = await loggedInResponse.json()
      console.log(loggedIn)
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
  async function deleteData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }

  async function updateData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      //redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }

  return (
    <Box>
      <Box className={classes.root}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            //border: "2px solid forestgreen",
            width: '100%',
          }}
        >
          <Controls.Input
            size="small"
            label="buscar"
            sx={{
              //width: { xs: 400, sm: 280, md: 600, lg: 700 },
              width: '50%',
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
          <Controls.Button
            variant="outlined"
            sx={{
              //width: { xs: 400, sm: 280, md: 600, lg: 700 },
              margin: 1,
              width: '7%',
              paddingLeft: '29px',
            }}
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true)
              setRecordForEdit(null)
            }}
          />
        </Toolbar>
        <TblContainer className={classes.table} size="small">
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting()?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.planType}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.mbps}</TableCell>
                <TableCell style={{
                  display:"flex",flexDirection:"row"
                }}>
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
        title="Formulario de usuario"
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
