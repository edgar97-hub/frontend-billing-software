import { DescriptionOutlined } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Button, Grid } from '@mui/material'
import { grey } from '@mui/material/colors'
import { InputExportExcel } from '../../../components/elements/Button'
// import { Title } from '../../../components/elements/Title'
import { exportTemplateExcel } from '../../../services/service'
import * as XLSX from 'xlsx'
import { useEffect, useState } from 'react'
// import { ImportarDatos } from './ImportarDatos'
// import { useClientes } from '../../../hooks/clientes/useClientes'
import { InfoCabeceras } from './InfoCabeceras'
import Sidebar from '../../../components/account/sidebar/Sidebar'
import { bulkInsertion } from '../apis'

export default function ImClients() {
  const [archivo, setArchivo] = useState(null)
  const [datos, setDatos] = useState([])

  const handleFile = async (e) => {
    const file = e.target.files[0]
    setArchivo(file.name)
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    )
    setDatos(jsonData)
  }

  const uploadRecords = async () => {
    var excelHeader = {
      NOMBRE: 'fullName',
      'TIPO CLIENTE': 'clientType',
      DIRECCIÓN: 'address',
      DISTRITO: 'district',
      'FECHA INICIO': 'startDate',
      'TIPO DOCUMENTO': 'documentType',
      'NÚMERO DOCUMENTO': 'documentNumber',
      TELÉFONO: 'telephone',
      CORREO: 'email',
      'PLAN INTERNT': 'plan',
      OBSERVACIONES: 'observations',
      ESTADO: 'state',
    }
    var records = []
    datos.map((value, index) => {
      var record = {}
      for (const key in value) {
        if (excelHeader[key]) {
          record[excelHeader[key]] = value[key]
        }
      }
      records.push(record)
    })
    console.log(records)
    await bulkInsertion(records)
  }

  const template = [
    {
      NOMBRE: '',
      'TIPO CLIENTE': '',
      DIRECCIÓN: '',
      DISTRITO: '',
      'FECHA INICIO': '',
      'TIPO DOCUMENTO': '',
      'NÚMERO DOCUMENTO': '',
      TELÉFONO: '',
      CORREO: '',
      'PLAN INTERNT': '',
      OBSERVACIONES: '',
      ESTADO: '',
    },
  ]

  const [openCabeceras, setOpenCabeceras] = useState(false)

  const handleOpenCabeceras = () => {
    setOpenCabeceras(true)
  }
  const handleCloseCabeceras = () => {
    setOpenCabeceras(false)
  }

  return (
    <>
      <Sidebar />
      <Box
        padding={3}
        sx={{
          border: 1,
          borderColor: grey[100],
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="outlined"
            color="success"
            startIcon={<DescriptionOutlined />}
            onClick={() => {
              exportTemplateExcel(template, 'Plantilla_Clientes')
            }}
          >
            Descargar plantilla
          </Button>

          <InputExportExcel
            handleFile={handleFile}
            uploadRecords={uploadRecords}
            name={archivo}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Button variant="outlined" onClick={handleOpenCabeceras}>
              información del encabezado de excel
            </Button>
          </Box>
        </Box>
      </Box>
      <InfoCabeceras open={openCabeceras} handleClose={handleCloseCabeceras} />
    </>
  )
}
