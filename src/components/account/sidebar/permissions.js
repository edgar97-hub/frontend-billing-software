// import Isettings from "../../assets/images/Dtafalonso-Android-L-Settings-L.ico";
// import IconContabilidad from "../../assets/images/accounting.png";
// import IconVentas from "../../assets/images/sales.png";
// import IconCompras from "../../assets/images/carts.png";
// import IconTranferenciaMercancia from "../../assets/images/warehouse.png";
// import IconFinanzas from "../../assets/images/finance.png";
// import IconReportes from "../../assets/images/report.png";
// import IconEstadistica from "../../assets/images/analysis.png";
// import IconNuevaVenta from "../../assets/images/nueva-venta.png";

export const permissions = [
	{
		title: "usuarios",
		path: "/usuarios",
		// icon: Isettings,
		// bgColor: "hsl(0,0%,73%)",
		// bgColorHover: "hsl(0,0%,83%)",
		// size: "contain",
		// position: "50% 30px",
		checks: [
			{
				title: "administracion",
			},
			{
				id: "personal-usuario",
				selectedIds: [],
				title: "personal-usuario",
				children: [
					{
						id: "usuarios",
						title: "usuarios",
					},
					{
						id: "roles",
						title: "roles",
					},
					{
						id: "documentos-usuario",
						title: "documentos-usuario",
					},
				],
			},
		],
	},

	{
		title: "contacto",
		path: "/consultas",
		// icon: Isettings,
		// bgColor: "hsl(0,0%,73%)",
		// bgColorHover: "hsl(0,0%,83%)",
		// size: "contain",
		// position: "50% 30px",
		 
	},



];