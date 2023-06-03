import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/toolsForm/useForm';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';

const genderItems = [
	{ id: 'male', title: 'Masculino' },
	{ id: 'female', title: 'Femenino' },
	{ id: 'other', title: 'Otro' },
];



const initialFValues = {
	id: 0,
	documenttype: '',
	Documentnumber: '',
	email: '',
	fullName: '',
	mobile: '',
	password: '',
};

export default function UserDialogForm(props) {
	const {
		addOrEdit,
		recordForEdit,
		roles,
		loading,
		getAllCompaniesAndBranches,
	} = props;
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ('fullName' in fieldValues)
			temp.fullName = fieldValues.fullName ? '' : 'Este campo es obligatorio';
		if ('email' in fieldValues)
			temp.email = /$^|.+@.+..+/.test(fieldValues.email)
				? ''
				: 'El correo no es válido';
		if ('mobile' in fieldValues)
			temp.mobile =
				fieldValues.mobile.length > 8 ? '' : 'Mínimo 9 números requeridos';
		// if ('role_id' in fieldValues)
		//   temp.role_id =
		//     fieldValues.role_id.length != 0 ? '' : 'Este campo es obligatorio';
		if ('password' in fieldValues)
			temp.password =
				fieldValues.password.length > 5 ? '' : 'Mínimo 6 caracteres requeridos';
		setErrors({
			...temp,
		});

		if (fieldValues == values) return Object.values(temp).every((x) => x == '');
	};

	const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
		useForm(initialFValues, true, validate);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log('data');
		if (validate()) {
			addOrEdit(values, resetForm);
		}
	};

	useEffect(() => {
		if (recordForEdit != null) {
			setValues({
				...recordForEdit,
			});
		}
	}, [recordForEdit]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid
				container
				spacing={2}
				direction="row"
				justifyContent="center"
			>


				<Grid item xs={6} sm={10} >
					<Controls.Input
						name="documenttype"
						size="small"
						label="tipo de documento"
						value={values.documenttype}
						onChange={handleInputChange}
						error={errors.documenttype}
						sx={{
							margin: 1
						}}
					/>
					<Controls.Input
						name="documentnumber"
						size="small"
						label="Número de documento"
						value={values.documentnumber}
						onChange={handleInputChange}
						error={errors.documentnumber}
						sx={{
							margin: 1
						}}
					/>
					<Controls.Input
						label="Email"
						name="email"
						size="small"
						value={values.email}
						onChange={handleInputChange}
						error={errors.email}
						sx={{
							margin: 1
						}}
					/>
					<Controls.Input
						label="Nombre completo"
						name="fullName"
						size="small"
						value={values.fullName}
						onChange={handleInputChange}
						sx={{
							margin: 1
						}}
					/>
					{/* <Controls.Input
						label="password"
						name="password"
						size="small"
						floatinglabeltext="Password"
						value={values.password}
						type={showPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
									>
										{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
									</IconButton>
								</InputAdornment>
							),
						}}
						onChange={handleInputChange}
						error={errors.password}
					/> */}
					<Controls.Input
						label="Número de teléfono"
						name="mobile"
						size="small"
						value={values.mobile}
						onChange={handleInputChange}
						error={errors.mobile}
						sx={{
							margin: 1
						}}
					/>


					{/* <Controls.Select
            name="role_id"
            label="Rol"
            value={values.role_id}
            onChange={handleInputChange}
            options={roles}
            error={errors.role_id}
          /> */}

					<div style={{
						margin: 1
					}}>
						<Controls.Button
							style={{
								margin: 3
							}}
							type="submit"
							text="Submit"
							size="small"
							loading={
								loading && (
									<CircularProgress
										size={40}
										style={{ position: 'absolute' }}
									/>
								)
							}
							disabled={loading}
						/>
						<Controls.Button
						style={{
							margin:3
						}}
							text="Reset"
							size="small"
							color="default"
							onClick={resetForm}
						/>
					</div>
				</Grid>
			</Grid>
		</Form>
	);
}