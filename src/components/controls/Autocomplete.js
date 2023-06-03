import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function useAutocomplete() {
  const [options, setOptions] = React.useState([]);
  const [openC, setOpenC] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState(null);
  // const [inputValue, setInputValue] = React.useState('');

  return {
    options,
    setOptions,
    open,
    setOpen,
    openC,
    setOpenC,
  };
}
export function Asynchronous({
  options,
  open,
  setOpen,
  setOptions,
  value,
  label,
  onInputChange,
  ...other
}) {
  const loading = open && options.length === 0;

  React.useEffect(() => {
    if (!open) {
      console.log('open status: ' + open);
      setOptions([]);
    }
  }, [open]);

  return (
    // {
    //   options: options,
    //   setOptions: setOptions,
    //   autocomplete:
    <Autocomplete
      disableClearable
      {...other}
      key={label}
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      // value={value}
      // isOptionEqualToValue={(option, value) => option.title === value.title}
      // getOptionLabel={(option) => option.title}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.recordDetail
      }
      onChange={(event, newValue) => {
        // setOptions(newValue ? [newValue, ...options] : options);
        // setValue(newValue);
      }}
      onInputChange={
        (event, newInputValue) => {
          // console.log(event);
          onInputChange(newInputValue);
        }
        // setInputValue(newInputValue);
      }
      options={options}
      loading={loading}
      // loading={loading.flag}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => {
        return (
          <Box component="li" {...props} key={option.id}>
            <Grid container alignItems="center">
              {/* <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid> */}
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                <Box component="span" sx={{ fontWeight: 'regular' }}>
                  {option?.recordDetail}
                </Box>
                {/* <Typography variant="body2" color="text.secondary">
                  {option.Ubigeo}
                </Typography> */}
              </Grid>
            </Grid>
          </Box>
        );
      }}
    />
  );
  // };
}
