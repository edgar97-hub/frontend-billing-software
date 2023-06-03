import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
//import { Grid } from "@material-ui/core";
import Grid from '@mui/material/Grid';
//import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { permissions } from "./permissions";
//import { useAuth } from "../../contexts/AuthContext";
//import { Login } from "../../pages";
import fiber_peru from "../../../assets/images/fiber_peru.jpg";
//import LogoDaphtech from "../../assets/images/logo_daphtech.png";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useEffect, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
//import "./sidebar.scss";
//import * as service from "../../services/service";
//import PdfViewer from "../../pages/pdf/PdfViewer";
//import { Badge, makeStyles } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
//import { collection, onSnapshot, query } from "firebase/firestore";
//import { db, functions, FirebaseToken } from "../../firebase";
//import Divisa from "./Divisa";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
//import EditDivisa from "./EditDivisa";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import UserInfo from "./UserInfo";

const drawerWidth = 240;
// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		backgroundColor: "#fff",
// 		//width: '100%',
// 	},
// }));

function ResponsiveDrawer({ children }) {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const navigate = useNavigate();
	// const classes = useStyles();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	// const {
	// 	currentUser,
	// 	logout,
	// 	loggingIn,
	// 	setCompanies,
	// 	companies,
	// 	setCurrentUser,
	// 	notifications,
	// 	_divisa,
	// 	setDivisa,
	// } = useAuth();
	const [company, setCompany] = useState("");
	const [branchOffice, setBranchOffice] = useState("");
	const [sidebarLoading, setSidebarLoaing] = useState(false);
	const [sidebarTest, setSidebarTest] = useState([]);

	// var exceptions = [
	// 	"/products/import",
	// 	"/productos/categorias/import",
	// 	"/clientes/import",
	// 	"/productos/subcategorias/import",
	// 	"/productos/clasificacion/import",
	// 	"/productos/unidad-medida/import",
	// 	"/notifications",
	// 	"/venta-edit",
	// 	"/reporte-caja-chica",
	// ];

	const handleChangeCompany = (event) => {
		// companies.some((el) => {
		// 	el.isSelected = false;
		// 	if (el.id === event.target.value) {
		// 		el.isSelected = true;
		// 		el.test[0].isSelected = true;
		// 	}
		// });
		// setCompanies((prevState) => [...prevState]);
	};

	const handleChangeBranchOffice = (event) => {
		// companies.map((el) => {
		// 	if (el.isSelected) {
		// 		el.test.map((item) => {
		// 			item.isSelected = false;
		// 			if (item.id === event.target.value) {
		// 				item.isSelected = true;
		// 			}
		// 		});
		// 	}
		// });
		// setCompanies((prevState) => [...prevState]);
	};

	// useEffect(() => {
	// 	if (
	// 		companies &&
	// 		currentUser &&
	// 		window.location.pathname != "/pdf-viewer"
	// 	) {
	// 		const company = companies.find((item) => item.isSelected);
	// 		setCompany(company?.id);
	// 		const companyBranch = company?.test?.find(
	// 			(item) => item.isSelected
	// 		);
	// 		setBranchOffice(companyBranch?.id);
	// 		currentUser.branch = currentUser?.allbranchRole?.find(
	// 			(o) => o.branch_id === companyBranch?.id
	// 		);
	// 	}
	// }, [companies]);

	// useEffect(() => {
	// 	const unsubRoles = onSnapshot(
	// 		query(collection(db, "roles")),
	// 		(snapShot) => {
	// 			const roles = [];
	// 			snapShot.docs.forEach((doc) => {
	// 				roles.push({ ...doc.data(), id: doc.id });
	// 			});

	// 			if (currentUser) {
	// 				currentUser.name_rol = "";
	// 				currentUser.permissions = [];
	// 			}
	// 			setSidebarLoaing(true);

	// 			if (currentUser?.branch) {
	// 				var RoleUser = roles?.find(
	// 					(rol) => rol.id == currentUser?.branch?.role_id
	// 				);
	// 				currentUser.role_id = RoleUser?.id;
	// 				currentUser.name_rol = RoleUser?.name;
	// 				currentUser.permissions = RoleUser?.permissions;

	// 				var _permissions = Permissions.map((value) => value);
	// 				_permissions = _permissions.filter((sidebarObj, index) => {
	// 					const pathname = sidebarObj.path.substring(
	// 						sidebarObj.path.indexOf("/") + 1
	// 					);
	// 					return service.checkPathPermission(
	// 						currentUser.permissions,
	// 						[],
	// 						pathname
	// 					);
	// 				});
	// 				setSidebarTest(_permissions);
	// 			}
	// 			// service.update("test", "1", { token: FirebaseToken() });

	// 			setSidebarLoaing(false);
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// 	return () => {
	// 		unsubRoles();
	// 	};
	// }, [branchOffice]);

	// useEffect(() => {
	// 	const unsubRoles = onSnapshot(
	// 		query(collection(db, "documentos-usuario")),
	// 		(snapShot) => {
	// 			const userDocuments = [];
	// 			snapShot.docs.forEach((doc) => {
	// 				userDocuments.push({ ...doc.data(), id: doc.id });
	// 			});

	// 			if (currentUser) {
	// 				currentUser.userDocuments = "";
	// 				currentUser.companyUserDocuments = [];
	// 			}
	// 			userDocuments?.map((item) => {
	// 				if (
	// 					item.idSucursal === service.getBranchId(companies) &&
	// 					item.idUsuario === currentUser?.uid
	// 				) {
	// 					currentUser.userDocuments = item;
	// 					setCurrentUser(currentUser);
	// 				}

	// 				if (item.idEmpresa === service.getCompanyID(companies)) {
	// 					currentUser?.companyUserDocuments.push(item);
	// 				}
	// 			});
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// 	return () => {
	// 		unsubRoles();
	// 	};
	// }, [branchOffice]);

	async function getDetails() {
		// if (currentUser) {
		// 	const { companies, user } = await service.companyBranchUser(
		// 		currentUser.uid
		// 	);
		// 	companies[0].isSelected = true;
		// 	companies[0].test[0].isSelected = true;
		// 	setCompanies(companies);
		// 	currentUser.allbranchRole = user.branchRole;
		// }
	}

	// useEffect(() => {
	// 	// if (window.location.pathname.split("/")[1] !== "pdf-viewer") {
	// 	// 	getDetails();
	// 	// }
	// }, [currentUser]);

	function CircularProgresss() {
		return (
			<CircularProgress
				size={150}
				style={{
					position: "fixed",
					left: "38%",
					top: "50%",
					marginLeft: "0",
					padding: "0",
				}}
			/>
		);
	}

	function CheckPath({ value }) {
		// const pathname = window.location.pathname.substring(
		// 	window.location.pathname.indexOf("/") + 1
		// );

		// var flag = service.checkPathPermission(
		// 	currentUser.permissions,
		// 	exceptions,
		// 	pathname
		// );
		// if (flag) {
		// 	return value;
		// } else {
		// 	return (
		// 		<Alert severity="error">
		// 			<AlertTitle>Permiso denegado</AlertTitle>
		// 			Póngase en contacto con su administrador de daphtech si cree
		// 			que se trata de un error.
		// 		</Alert>
		// 	);
		// }
	}

	function CheckUrl({ Component }) {
		// if (window.location.pathname === "/login") {
		// 	return <Login />;
		// }
		// if (window.location.pathname.split("/")[1] === "pdf-viewer") {
		// 	return <PdfViewer />;
		// } else {
		// 	return Component;
		// }
	 
	}
	const RequireAuth = ({ Component }) => {
		// return typeof currentUser === "undefined" ? (
		// 	<CircularProgresss />
		// ) : currentUser ||
		//   window.location.pathname.split("/")[1] === "pdf-viewer" ? (
		// 	loggingIn ? (
		// 		<CircularProgresss />
		// 	) : (
		// 		<CheckUrl Component={Component} />
		// 	)
		// ) : (
		// 	<Login />
		// );
	};
	function logout(){
		localStorage.removeItem("token");
		navigate('/mi-portal')
	}
	const drawer = (
		<div
			className="test"
			style={{
				width: "100%",
				height: "100%",
				//border: "5px solid rgb(102, 97, 97)",
			}}
		>
			<div className="company-and-user-info" style={{
				display:"flex"
			}}>
				<img
					src={fiber_peru}
					alt="jobs"
					style={{
						marginLeft: "50px",
						marginTop: "20px",
						width: "100px",
						height: "100px",
						borderRadius:"99px",
						overflow: "hidden",
						//transform: "scale(1.3)",
						//border: "1px solid #0d0d0f",
					}}
				/>
				 <UserInfo currentUser={{}} logout={logout} /> 
			</div>

			 
			<List
				sx={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					marginTop: "50px",
					marginLeft: "9px",
					marginRight: "3px",
					gap: "5px",
				}}
			>
				  {permissions.map((item, index) => (
							<Button
								key={index}
								sx={{
									width: "6rem",
									height: "4.1rem",
									backgroundColor: item.bgColor,
									borderRadius: "9px",
									boxShadow:
										"0px 0px 3px 0px rgba(0,0,0,0.15)",
									backgroundImage: `url(${item.icon})`,
									backgroundRepeat: "no-repeat",
									backgroundSize: item.size,
									backgroundPosition: item.position,
									"&:hover": {
										backgroundColor: item.bgColorHover,
										boxShadow:
											"0px 0px 3px 0px rgba(0,0,0,0.25)",
									},
								}}
								onClick={() => {
									navigate(item.path);
								}}
							>
								<span
									style={{
										marginTop: "-30px",
										color: "black",
										fontSize: ".55rem",
										fontWeight: "900",
									}}
								>
									{item.title}
								</span>
							</Button>
					  ))
					 }
			</List>
			<Divider />
		</div>
	);

	const container =
		window !== undefined ? () => window.document.body : undefined;

	return (
	 
				<div style={{ display: "flex" }}  >
					<AppBar
						position="fixed"
						sx={{
							width: { sm: `calc(100% - ${10}px)` },
							ml: { sm: `${10}px` },
						}}
					>
						<Toolbar sx={{ backgroundColor: "white" }}>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								sx={{ mr: 2, display: { sm: "none" }, }}
							>
								<MenuIcon sx={{ color: "black" }} />
							</IconButton>

							<Grid container alignItems="center" spacing={2}>
								<Grid item xs></Grid>
								<Grid item>
									<IconButton
										onClick={() => {
											navigate(-1);
										}}
										size="large"
										sx={{
											display: {
												xs: "none",
												sm: "inline-block",
											},
											// border: '1px solid black',
											margin: 0,
											padding: 0,
										}}
									>
										<ReplyAllIcon
											size="large"
											sx={{
												minWidth: 100,
												minHeight: 40,
												// border: '1px solid black',
											}}
										/>
									</IconButton>

									{/* // display: mobileOpen ? 'none' : 'block', */}
									{/* <IconButton
                    onClick={() => {
                      var url =
                        "https://us-central1-daphtech-31758.cloudfunctions.net/sendMessage";

                      fetch(url)
                        .then((response) => response.json())
                        .then((value) => {
                          console.log(value);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <AdUnitsIcon />
                  </IconButton> */}
									{/* <Divisa divisa={_divisa} /> */}
									<IconButton>
										{/* <EditDivisa
											divisa={_divisa}
											setDivisa={setDivisa}
										/> */}
									</IconButton>
									<IconButton>
										{/* <Badge
											overlap="rectangular"
											badgeContent={
												notifications?.filter((e) => {
													return !e.users.includes(
														currentUser?.uid
													);
												}).length
											}
											color="secondary"
										>
											<NotificationsNoneIcon
												fontSize="medium"
												onClick={(e) => {
													notifications.map(
														async (value) => {
															if (
																!value.users.includes(
																	currentUser.uid
																)
															) {
																value.users.push(
																	currentUser.uid
																);
															}
															await service.update(
																"notifications",
																value.id,
																value
															);
														}
													);
													navigate("/notifications");
													// window.open("/notifications", '_blank', 'noopener,noreferrer')
												}}
											/>
										</Badge> */}
									</IconButton>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
					<Box
						component="nav"
						sx={{
							width: { sm: drawerWidth },
							flexShrink: { sm: 0 },
							
						}}
						aria-label="mailbox folders"
					>
						{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
						<Drawer
							container={container}
							variant="temporary"
							open={mobileOpen}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
							sx={{
								display: { xs: "block", sm: "none" },
								"& .MuiDrawer-paper": {
									boxSizing: "border-box",
									width: drawerWidth,
								},
							}}
						>
							{drawer}
						</Drawer>
						<Drawer
							variant="permanent"
							sx={{
								display: { xs: "none", sm: "block" },
								"& .MuiDrawer-paper": {
									boxSizing: "border-box",
									width: drawerWidth,
								},
							}}
							open
						>
							{drawer}
						</Drawer>
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							paddingLeft: 2,
							paddingRight: 2,
							paddingTop: 2,
							width: {
								sm: `calc(100% - ${drawerWidth}px)`,
								xs: `calc(100% - ${drawerWidth}px)`,
							},
							// border: "5px solid rgb(102, 97, 97)",
						}}
					>
						<Toolbar />
						{/* {currentUser?.permissions && (
							<CheckPath value={children} />
						)} */}
						<CheckPath value={children} />
					</Box>
				</div>
	);
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default ResponsiveDrawer;