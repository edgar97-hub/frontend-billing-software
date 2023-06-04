import React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
//import { DatePicker as DatePickerCustom } from '@mui/x-date-pickers/DatePicker'
import { DesktopDatePicker as DatePickerCustom } from '@mui/x-date-pickers/DesktopDatePicker'

export default function DatePicker(props) {
  const { name, label, value, onChange, ...other } = props

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerCustom
        name={name}
        label={label}
        format="DD/MM/YYYY"
        value={value}
        slotProps={{
          textField: { size: 'small', fullWidth: true },
        }}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        renderInput={(params) => <TextField {...params} size="small" />}
      />
    </LocalizationProvider>
  )
}

{
  /**import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

    const { name, label, value, onChange } = props

    const convertToDefEventPara = (name, value) => ({

        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}

            />
        </MuiPickersUtilsProvider>
    )
}

 */
}
