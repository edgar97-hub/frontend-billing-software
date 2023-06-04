import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/account/sidebar/Sidebar'

// Iconos del menu
// import IconNotificaciones from "../../assets/images/notification.png";
// import IconPersonal from "../../assets/images/man.png";
// import IconDocumento from "../../assets/images/folders.png";
// import IconArticulos from "../../assets/images/packaging.png";
// import IconAuxiliares from "../../assets/images/service.png";
// import IconEmpresaSucursales from "../../assets/images/enterprise.png";
const Setting = () => {
  const navigate = useNavigate()

  var settings = [
    {
      title: 'planes-internet',
      path: '/planes-internet',
      // icon: Isettings,
      // bgColor: "hsl(0,0%,73%)",
      // bgColorHover: "hsl(0,0%,83%)",
      // size: "contain",
      // position: "50% 30px",
    },
  ]
  return (
    <div>
      <Sidebar />
      <Grid container>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexGrow: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            //height: "76vh",
            height: '100%',
            gap: '50px',

            // border: "1px solid rgb(102, 97, 97)",
          }}
        >
          {settings.map((item, index) => (
            <Button
              key={index}
              sx={{
                width: '13rem',
                height: '7rem',
                // border: "0.5px solid rgb(102, 97, 97)",
                boxShadow: '0.5px 3px 3px 0.5px grey',
                // margin: "3px",
                marginBottom: '6px',
                borderRadius: '9px',
                backgroundColor: 'hsl(206,92%,80%)',
                backgroundImage: ` url(${item.icon})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '35%',
                backgroundPosition: '50% 40px',
                '&:hover': {
                  backgroundColor: 'hsl(206,92%,70%)',
                },
              }}
              onClick={() => {
                navigate(item.path)
              }}
            >
              <span
                style={{
                  marginTop: '-70px',
                  color: 'black',
                  fontSize: '10px',
                  fontWeight: '900',
                }}
              >
                {item.title}
              </span>
            </Button>
          ))}
        </Grid>
      </Grid>
    </div>
  )
}

export default Setting
