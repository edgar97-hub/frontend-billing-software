import React, { useState, useEffect } from 'react'
import UserDialogForm from './UserDialogForm';
import useTable from '../../components/toolsForm/useTable'
import Controls from '../../components/controls/Controls'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Popup from '../../components/toolsForm/Popup'
import Notification from '../../components/toolsForm/Notification'
import ConfirmDialog from '../../components/toolsForm/ConfirmDialog'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import InputAdornment from '@mui/material/InputAdornment'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'

const useStyles = makeStyles((theme) => ({
  pageContent: {
    // margin: theme.spacing(1),
    // padding: theme.spacing(1),
    // padding: '0 30px 10px 20px',
    width: '70%',
     border: "2px solid forestgreen",
    marginLeft:"15%",
    display:"flex",
    flexDirection:"column",
    alignItems:"end",
    justifyContent:"center",
    //gap:5,
    //padding:"40px"
  },
  allUsers: {
    //right: '10px'
    //marginRight:"80px",
    marginLeft: '20px',
    marginBottom: '10px',
  },
}))

const headCells = [
  { id: 'documenttype', label: 'tipo de documento' },
  { id: 'Documentnumber', label: 'Número de documento' },
  { id: 'email', label: 'Email' },
  { id: 'fullName', label: 'Nombre completo' },
  { id: 'mobile', label: 'Número de teléfono' },
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

  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {


    var localhost = "http://localhost:5001"
    var remoteServer = "https://node-app-fiber-peru.onrender.com"
    var token = localStorage.getItem('token')
     async function getUsers(){
      const loggedInResponse = await fetch(
        localhost + '/api/v1/users',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token },
        }
      )
      const response = await loggedInResponse.json()
      console.log(response)
    setRecords(response.userMap);

    }
    //getUsers()

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
    if (value.id == 0) {
      try {
        await postData(
          'https://us-central1-daphtech-31758.cloudfunctions.net/user',
          value
        )
      } catch (error) {
        alert(error)
      }
    } else {
      try {
        await updateData(
          'https://us-central1-daphtech-31758.cloudfunctions.net/user',
          value
        )
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
      } catch (error) {
        console.log(error)
      }
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
  }

  const recordEdit = (item) => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  async function onDelete(item) {
    setLoading(true)
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    try {
      var response = await deleteData(
        'https://us-central1-daphtech-31758.cloudfunctions.net/user',
        item
      )
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
    <>
      <Paper className={classes.pageContent}>
        <Toolbar sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            //border: "2px solid forestgreen",
            width:"100%",


            }}>
          <Controls.Input
            size="small"
            label="Buscar usuarios"
            sx={{
              //width: { xs: 400, sm: 280, md: 600, lg: 700 },
              width: "50%",
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
            variant="outlined"sx={{
              //width: { xs: 400, sm: 280, md: 600, lg: 700 },
              margin: 1,
              width: "7%",
                paddingLeft:"29px"
            }}
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true)
              setRecordForEdit(null)
            }}
          />
        </Toolbar>
        <TblContainer size="small">
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting()?.map((item) => (
              <TableRow key={item.documenttype}>
                 <TableCell>{item.documenttype}</TableCell>
                <TableCell>{item.documentnumber}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.telefono}</TableCell>
               

                {/* <TableCell>{item.role}</TableCell> */}
                <TableCell>
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
      </Paper>
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
    </>
  )
}
