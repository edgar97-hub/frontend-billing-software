import React, { useState, useEffect, useRef, useMemo } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
// import ProductsTable from "./ProductsTable";
import CircularProgress from '@mui/material/CircularProgress'
// import {
// query,
// collection,
// getDocs,
// orderBy,
// startAt,
// endAt,
// onSnapshot,
// where,
// } from "firebase/firestore";
// import { db } from "../../firebase";
import { v4 as uuidv4 } from 'uuid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
// import { useAuth } from "../../contexts/AuthContext";
// import * as service from "../../services/service";
// import { NotificationManager } from "react-notifications";
// import LookupDNIandRUC from "./LookupDNIandRUC";
// import RetencionesRetracciones from "./RetencionesRetracciones";
import { useNavigate } from 'react-router-dom'
// import ReferenceDocument from "./ReferenceDocument";
import Popper from '@mui/material/Popper'
// import { useStock } from "../../hooks/stock/useStock";
// import Documents from "./Documents";
// import Serie from "./Serie";
// import Others from "./Others";
// import QRCodeBar from "./QRCodeBar";
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining'
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import { useUnidadMedida } from "../../hooks/unidad-medida/useUnidadMedida";
// import { useDocumentosVentas } from "../../hooks/documentos/useDocumentosVentas";
// import { useDocumentos } from "../../hooks/documentos/useDocumentos";
import { Avatar, Tooltip } from '@mui/material'
// import { ModalStockAlmacenes } from "./ModalStockAlmacenes";
// import { useProductos } from "../../hooks/productos/useProductos";
// import { useAlmacenes } from "../../hooks/almacenes/useAlmacenes";
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  wrapSaleInformation: {
    display: 'flex',
    border: '1px solid rgb(102, 97, 97)',

    // [theme.breakpoints.down("sm")]: {
    // flexDirection: "column",
    // },
    // [theme.breakpoints.up("sm")]: {
    // flexDirection: "row",
    // },
    // [theme.breakpoints.up("md")]: {
    // flexDirection: "row",
    // },
    // [theme.breakpoints.up("lg")]: {
    // flexDirection: "row",
    // },
    gap: '20px',
    flexWrap: 'wrap',
  },
  wrapClient: {
    display: 'flex',
    flexDirection: 'row',

    gap: '10px',
  },
  datesandCurrency: {
    border: '1px solid rgb(102, 97, 97)',
    display: 'flex',
    gap: '10px',
  },
}))

const NewSale = () => {
  // const { actualizarStock } = useStock();
  const classes = useStyles()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [currentProduct, setCurrentProduct] = useState('')
  const [indexDivisa, setIndexDivisa] = useState(0)

  const [incIgv, setIncIgv] = useState(true)
  const [searchByPackage, setSearchByPackage] = useState(false)

  const [openC, setOpenC] = useState(false)
  const [optionsC, setOptionsC] = useState([
    {
      name: 'ed',
    },
  ])
  const loadingC = openC && optionsC.length === 0

  const [openP, setOpenP] = useState(false)
  const [optionsP, setOptionsP] = useState([])
  const [productPackages, setProductPackages] = useState([])

  const loadingP = openP && optionsP.length === 0
  const [total, setTotal] = useState(0)
  // const { companies, currentUser, _divisa } = useAuth();
  const [warehouses, setWarehouses] = useState([])
  const [warehouseId, setWarehouseId] = useState('all')
  const [documents, setDocuments] = useState([])
  const [paymentConditions, setPaymentConditions] = useState({
    credito: [],
    contado: [],
  })
  const [divisa, setDivisa] = useState([
    {
      code: 'PEN',
      name: 'SOLES',
      flag: 'S/',
    },
    {
      code: 'USD',
      name: 'DOLARES AMERICANOS',
      flag: '$',
    },
    // { code: 'EUR', name: 'EUROS', flag: '€' },
  ])
  const [productPrice, setProductPrice] = useState('precio1')
  const productPrices = [
    'precio1',
    'precio2',
    'precio3',
    'precio4',
    'precio5',
    'precio6',
  ]
  const productoDivisa = {
    PEN: 'preciosSoles',
    USD: 'preciosDolares',
    EUR: 'preciosEuros',
  }
  const [series, setSeries] = useState([])
  const [serieObj, setSerieObj] = useState({
    serie: '',
    sellerDocumentSerie: '',
  })
  const [anchorEl, setAnchorEl] = useState(null)
  // const { unidades } = useUnidadMedida();
  // const { documentosVenta } = useDocumentosVentas();
  // const { documentosVentas } = useDocumentos();
  const bolsa = 0.5

  var value = {
    serie: '',
    bag: false,
    costbag: '0.00',
    // branchId: service.getBranchId(companies),
    // CompanyId: service.getCompanyID(companies),
    timeStamp: new Date().getTime(),
    products: [],
    isSale: true,
    company: {
      // ruc: service.getCompanyDetail(companies).ruc_number,
      // business_name: service.getCompanyDetail(companies).business_name,
      // tradename: "FACTURACION ELECTRÓNICA",
      // logo: service.getCompanyDetail(companies).logo,
      // ubigeo: service.getCompanyDetail(companies).ubigeo,
      // province: service.getCompanyDetail(companies).province,
      // department: service.getCompanyDetail(companies).department,
      // district: service.getCompanyDetail(companies).district,
      // residential_tax:
      // service.getCompanyDetail(companies).residential_tax,
      // landline: service.getCompanyDetail(companies).landline,
      // mobile_phone: "927005466",
      // environment: service.getCompanyDetail(companies).environment,
      // user: service.getCompanyDetail(companies).user,
      // password: service.getCompanyDetail(companies).password,
    },
    client: {
      clientId: '',
      documentNumber: '',
      customerName: '',
      unknownUser: '',
      typeDocument: '',
      mail: '',
    },
    voucherIdentificationData: {
      objSerieIndex: '',
      series: [],
      objSerie: {},
      igv: '',
      document: {},
      cuotas: [],
      n_cuotas: '0',
      payment_condition: 'CONTADO',
      divisa: {
        code: 'PEN',
        name: 'SOLES',
        flag: 'S/',
        exchangeRate: {},
      },
      UBLVersionID: '2.1',
      customizationID: '2.0',
      serie: '',
      number: '',
      date_issue: Date.now(),
      issuance_time: '15:02:21',
      expiration_date: Date.now(),
      type_operation: '0101',
      document_code: '',
      document_currency_code: 'PEN',
      voucher_type: '',
      series_number_attached_voucher: '',
      nc_code: '',
      reason: '',
      payment_method: '',
      referralGuide: '',
      oc_os: '',
      observation3: '',
      observation4: '',
      observation5: '',

      withholdings: {
        withholdingRegime: 'NO AFECTO',
        ChargeIndicator: 'false',
        AllowanceChargeReasonCode: '62',
        MultiplierFactorNumeric: '0.00',
        Amount: '0.00',
        BaseAmount: '0.00',
      },
      detraction: {
        serviceCode: 'NO AFECTO',
        PaymentMeans: {
          ID: 'Detraccion',
          PaymentMeansCode: '',
          PayeeFinancialAccountID: '',
        },
        PaymentTerms: {
          ID: '',
          PaymentMeansID: '',
          PaymentPercent: '',
          Amount: '',
        },
      },
    },
    total_voucher_data: {
      fullDiscount: '0.00',
    },
  }
  const [inputs, setInputs] = useState(
    JSON.parse(localStorage.getItem('salesCopy')) || value
  )

  // useEffect(() => {
  // if (inputs.voucher_identification_data.document) {
  // getConditions();
  // if (inputs.voucher_identification_data.document?.comentario1) {
  // inputs.voucher_identification_data.comentario1 =
  // inputs.voucher_identification_data.document?.comentario1;
  // }

  // if (inputs.voucher_identification_data.document?.comentario2) {
  // inputs.voucher_identification_data.comentario2 =
  // inputs.voucher_identification_data.document?.comentario2;
  // }

  // if (inputs.voucher_identification_data.document?.observacion1) {
  // inputs.voucher_identification_data.referralGuide =
  // inputs.voucher_identification_data.document?.observacion1;
  // }

  // if (inputs.voucher_identification_data.document?.observacion2) {
  // inputs.voucher_identification_data.oc_os =
  // inputs.voucher_identification_data.document?.observacion2;
  // }

  // if (inputs.voucher_identification_data.document?.observacion3) {
  // inputs.voucher_identification_data.observation3 =
  // inputs.voucher_identification_data.document?.observacion3;
  // }

  // if (inputs.voucher_identification_data.document?.observacion4) {
  // inputs.voucher_identification_data.observation4 =
  // inputs.voucher_identification_data.document?.observacion4;
  // }

  // if (inputs.voucher_identification_data.document?.observacion5) {
  // inputs.voucher_identification_data.observation5 =
  // inputs.voucher_identification_data.document?.observacion5;
  // }
  // }
  // }, [inputs?.voucher_identification_data?.document]);

  const getConditions = async () => {
    // const querySnapshot = await getDocs(collection(db, "conditions"));
    // var cashConditions = [];
    // var creditConditions = [];
    // querySnapshot.forEach((doc) => {
    // if (doc.data().condition_type === "CONTADO") {
    // inputs?.voucher_identification_data?.document?.condiciones?.map(
    // (object) => {
    // if (object.id === doc.id) {
    // cashConditions.push({
    // ...doc.data(),
    // id: doc.id,
    // deuda: object.deuda,
    // });
    // }
    // }
    // );
    // }
    // if (doc.data().condition_type === "CRÉDITO") {
    // inputs?.voucher_identification_data?.document?.condiciones?.map(
    // (object) => {
    // if (object.id === doc.id) {
    // creditConditions.push({
    // ...doc.data(),
    // id: doc.id,
    // deuda: object.deuda,
    // });
    // }
    // }
    // );
    // }
    // });
    // paymentConditions.contado = cashConditions;
    // paymentConditions.credito = creditConditions;
    // setPaymentConditions(paymentConditions);
  }

  async function totalBag() {
    var quantity = 0
    inputs.products.map((item) => {
      if (item.bag === true) {
        quantity = quantity + item.quantity
      }
    })
    inputs.costbag = (quantity * bolsa).toFixed(2)
  }

  async function onChangeInput() {
    var total = 0
    inputs.total_voucher_data.fullDiscount = 0
    inputs.products.map((item) => {
      item.total = parseFloat(item.quantity) * parseFloat(item.price)
      item.fullDiscount =
        (item.total / 100) *
        (item.discount < 0 ? (item.discount = 0) : item.discount)
      item.total = item.total - item.fullDiscount
      item.total = item.total.toFixed(2)
      total = total + parseFloat(item.total)
      inputs.total_voucher_data.fullDiscount += parseFloat(item.fullDiscount)
    })
    inputs.total_voucher_data.fullDiscount =
      inputs.total_voucher_data?.fullDiscount?.toFixed(2)

    await totalBag()
    total = total.toFixed(2)
    setTotal(total)
    setInputs((prevState) => ({
      ...prevState,
    }))
  }

  async function handleCheckControl(e, value) {
    inputs.products.map((item) => {
      if (item.uuidv4 == value.uuidv4) {
        item.bag = e
      }
    })
    await totalBag()
    setInputs((prevState) => ({
      ...prevState,
    }))
  }

  async function handleIncIgv(e) {
    // var igv1 = parseFloat("1." + service.getIgv(inputs, documents));
    // inputs.products.map((item) => {
    // if (item.incluyeIGV) {
    // if (!e && !item.notIncIgv) {
    // item.notIncIgv = true;
    // item.price = (parseFloat(item.price) * igv1).toFixed(2);
    // } else {
    // if (item.notIncIgv !== undefined) {
    // item.notIncIgv = false;
    // item.price = (parseFloat(item.price) / igv1).toFixed(2);
    // }
    // }
    // }
    // });
    // await totalBag();

    setInputs((prevState) => ({
      ...prevState,
    }))
  }

  const handleChangeRemoveProduct = async (e, uuidv4) => {
    e.preventDefault()
    inputs.products = inputs.products.filter((data) => data.uuidv4 != uuidv4)
    var total = 0
    inputs.products.map((item) => {
      total = total + parseFloat(item.total)
    })
    setTotal(total)
    await totalBag()
    setInputs((prevState) => ({
      ...prevState,
    }))
  }

  const onChangeHandleClient = async (value) => {
    // const ref = collection(db, "clientes");
    // const q = query(
    // ref,
    // orderBy(isNaN(value) ? "nombre" : "numeroDocumento"),
    // startAt(value.toUpperCase()),
    // endAt(value.toUpperCase() + "\uf8ff")
    // );
    // const querySnapshot = await getDocs(q);
    // var data = [];
    // querySnapshot.forEach((doc) => {
    // if (
    // doc.data().tipoCliente == "CLIENTE" ||
    // doc.data().tipoCliente == "CLIENTE/PROVEEDOR"
    // ) {
    // data.push({ id: doc.id, uuidv4: uuidv4(), ...doc.data() });
    // }
    // });
    // setOptionsC(data);
  }

  const loadProductPackages = async (value) => {
    // const ref = collection(db, "paquetes-productos");
    // const querySnapshot = await getDocs(ref);
    // var packages = [];
    // querySnapshot.forEach((doc) => {
    // if (doc.data().tienda === service.getBranchId(companies)) {
    // packages.push({ ...doc.data(), id: doc.id, uuidv4: uuidv4() });
    // }
    // });
    // setProductPackages(packages);
  }

  useEffect(() => {
    if (!openC) {
      setOptionsC([])
    }
  }, [openC])

  // useEffect(() => {
  // let documents = [];
  // documentosVentas?.map((object) => {
  // var userDocuments =
  // currentUser?.userDocuments?.documentosVentas?.map(
  // (data) => data.id
  // );
  // var _documentoVenta = documentosVenta?.find(
  // (element) =>
  // element.idDocumento === object.id &&
  // element.idEmpresa === service.getCompanyID(companies) &&
  // !element.esDocTransferenciaMercancias &&
  // !element.esGuiaRemison
  // );
  // if (userDocuments?.includes(object.id)) {
  // documents.push({
  // ..._documentoVenta,
  // ...object,
  // id: object.id,
  // tieneDocumentoDetalle:
  // typeof _documentoVenta !== "undefined",
  // });
  // }
  // });
  // setDocuments(documents);
  // }, [documentosVentas, documentosVenta, currentUser]);

  useEffect(() => {
    // const unsubWarehouses = onSnapshot(
    // query(
    // collection(db, "warehouses"),
    // where("branch_offices_id", "==", service.getBranchId(companies))
    // ),
    // (snapShot) => {
    // const warehouses = [];
    // snapShot.docs.forEach((doc) => {
    // if (doc.data().usersIDSelected?.includes(currentUser.uid)) {
    // warehouses.push({ ...doc.data(), id: doc.id });
    // }
    // });
    // setWarehouses(warehouses);
    // },
    // (error) => {
    // console.log(error);
    // }
    // );
    // return () => {
    // unsubWarehouses();
    // };
  }, [])

  // useEffect(() => {
  // loadProductPackages();
  // async function loadProducts() {
  // // var data = await service.loadProducts(
  // // 	companies,
  // // 	warehouses,
  // // 	inputs,
  // // 	unidades,
  // // 	productoDivisa,
  // // 	productPrice
  // // );
  // // setOptionsP(data);
  // }
  // loadProducts();
  // }, [companies, warehouses, unidades]);

  async function calculateTaxProducts() {
    // var igv = parseFloat(service.getIgv(inputs, documents));
    // var igv1 = parseFloat("1." + service.getIgv(inputs, documents));

    // var LineExtensionAmount = 0;
    // var PayableAmount = 0;
    // var TaxAmount = 0;
    // var TaxableAmount = 0;
    // var bagTaxAmount = 0;
    // inputs.bag = false;
    // inputs.products.forEach((doc) => {
    // doc.sunat_code = "01";
    // doc.product_code = "w";
    // LineExtensionAmount += doc.total / igv1;
    // PayableAmount =
    // (doc.bag === true
    // ? doc.quantity * bolsa + PayableAmount
    // : PayableAmount) + parseFloat(doc.total);

    // TaxAmount += doc.total - doc.total / igv1;
    // TaxableAmount += doc.total / igv1;

    // if (doc.bag === true) {
    // bagTaxAmount += doc.quantity * bolsa;
    // inputs.bag = true;
    // doc.taxes = {
    // InvoicedQuantity: doc.quantity,
    // LineExtensionAmount: parseFloat(
    // (doc.total / igv1).toFixed(2)
    // ),
    // PriceAmount:
    // parseFloat(
    // doc.fullDiscount > 0
    // ? doc.price - doc.fullDiscount
    // : doc.price
    // ) + bolsa,
    // PriceTypeCode: "01",

    // AllowanceCharge: {
    // ChargeIndicator: "false",
    // AllowanceChargeReasonCode: "00",
    // MultiplierFactorNumeric: doc.discount / 100,
    // Amount: doc.fullDiscount ? doc.fullDiscount : 0,
    // BaseAmount: (doc.price / igv1).toFixed(2),
    // },

    // TaxTotal: {
    // TaxAmount: (
    // doc.total -
    // doc.total / igv1 +
    // doc.quantity * bolsa
    // ).toFixed(2),
    // bag_tax: {
    // TaxAmount: (doc.quantity * bolsa).toFixed(2),
    // BaseUnitMeasure: doc.quantity,
    // PerUnitAmount: bolsa,
    // TaxScheme_id: "7152",
    // TaxScheme_Name: "ICBPER",
    // TaxScheme_TaxTypeCode: "OTH",
    // },
    // igv_tax: {
    // TaxableAmount: (doc.total / igv1).toFixed(2),
    // TaxAmount: (doc.total - doc.total / igv1).toFixed(
    // 2
    // ),
    // TaxCategoryPercent: igv,
    // TaxCategoryTaxExemptionReasonCode: "10",
    // TaxScheme_id: "1000",
    // TaxScheme_Name: "IGV",
    // TaxScheme_TaxTypeCode: "VAT",
    // },
    // },
    // priceWithoutTax: (doc.price / igv1).toFixed(10),
    // };
    // } else {
    // doc.taxes = {
    // InvoicedQuantity: doc.quantity,
    // LineExtensionAmount: parseFloat(
    // (doc.total / igv1).toFixed(2)
    // ),
    // PriceAmount: parseFloat(
    // doc.fullDiscount > 0
    // ? doc.price - doc.fullDiscount
    // : doc.price
    // ),
    // PriceTypeCode: "01",

    // AllowanceCharge: {
    // ChargeIndicator: "false",
    // AllowanceChargeReasonCode: "00",
    // MultiplierFactorNumeric: doc.discount / 100,
    // Amount: doc.fullDiscount ? doc.fullDiscount : 0,
    // BaseAmount: (doc.price / igv1).toFixed(2),
    // },

    // TaxTotal: {
    // TaxAmount: (doc.total - doc.total / igv1).toFixed(2),
    // igv_tax: {
    // TaxableAmount: (doc.total / igv1).toFixed(2),
    // TaxAmount: (doc.total - doc.total / igv1).toFixed(
    // 2
    // ),
    // TaxCategoryPercent: igv,
    // TaxCategoryTaxExemptionReasonCode: "10",
    // TaxScheme_id: "1000",
    // TaxScheme_Name: "IGV",
    // TaxScheme_TaxTypeCode: "VAT",
    // },
    // },
    // priceWithoutTax: (doc.price / igv1).toFixed(10),
    // };
    // }
    // });

    // if (inputs.bag) {
    // inputs.total_voucher_data = {
    // fullDiscount: inputs.total_voucher_data.fullDiscount,
    // LineExtensionAmount: LineExtensionAmount.toFixed(2),
    // PayableAmount: PayableAmount.toFixed(2),
    // TaxAmount: TaxAmount.toFixed(2),
    // bag_tax: {
    // TaxAmount: bagTaxAmount.toFixed(2),
    // TaxSchemeID: "7152",
    // TaxSchemeName: "ICBPER",
    // TaxSchemeTaxTypeCode: "OTH",
    // },
    // igv_tax: {
    // TaxableAmount: TaxableAmount.toFixed(2),
    // TaxAmount: TaxAmount.toFixed(2),
    // TaxSchemeID: "1000",
    // TaxSchemeName: "IGV",
    // TaxSchemeTaxTypeCode: "VAT",
    // },
    // };
    // } else {
    // inputs.total_voucher_data = {
    // fullDiscount: inputs.total_voucher_data.fullDiscount,
    // LineExtensionAmount: LineExtensionAmount.toFixed(2),
    // PayableAmount: PayableAmount.toFixed(2),
    // TaxAmount: TaxAmount.toFixed(2),
    // igv_tax: {
    // TaxableAmount: TaxableAmount.toFixed(2),
    // TaxAmount: TaxAmount.toFixed(2),
    // TaxSchemeID: "1000",
    // TaxSchemeName: "IGV",
    // TaxSchemeTaxTypeCode: "VAT",
    // },
    // };
    // }

    // inputs.client.client_id =
    // inputs.client?.type_document == "DNI" ? "1" : "6";
    // inputs.client_document_number = inputs.client.document_number;
    // inputs.seller = currentUser.displayName?.toUpperCase();
    // inputs.serie = serieObj.serie;
    // inputs.serieObj = serieObj;
    // inputs.voucher_identification_data.serie = inputs.serie;

    // var lastInsertedDocument = await getLastInsertedDocument();
    // // console.log(lastInsertedDocument);
    // if (lastInsertedDocument == -1 || lastInsertedDocument == -2) {
    // return lastInsertedDocument;
    // }
    // inputs.correlative_number = lastInsertedDocument;
    // inputs.voucher_identification_data.number = inputs.correlative_number;
    // inputs.voucher_identification_data.date_issue = service.getDate(
    // inputs.voucher_identification_data.date_issue
    // );
    // inputs.voucher_identification_data.expiration_date = service.getDate(
    // inputs.voucher_identification_data.expiration_date
    // );

    // if (
    // inputs.voucher_identification_data.withholdings.withholdingRegime !=
    // "NO AFECTO"
    // ) {
    // var multiplierFactorNumeric =
    // inputs.voucher_identification_data.withholdings
    // .withholdingRegime;
    // inputs.voucher_identification_data.withholdings.MultiplierFactorNumeric =
    // multiplierFactorNumeric;
    // inputs.voucher_identification_data.withholdings.Amount = (
    // parseFloat(inputs.total_voucher_data.PayableAmount) *
    // parseFloat(multiplierFactorNumeric)
    // ).toFixed(2);
    // inputs.voucher_identification_data.withholdings.BaseAmount =
    // inputs.total_voucher_data.PayableAmount;
    // inputs.voucher_identification_data.net_amount_pending_payment = (
    // parseFloat(inputs.total_voucher_data.PayableAmount) -
    // parseFloat(
    // inputs.voucher_identification_data.withholdings.Amount
    // )
    // ).toFixed(2);
    // }
    // if (
    // inputs.voucher_identification_data.detraction.serviceCode !=
    // "NO AFECTO"
    // ) {
    // inputs.voucher_identification_data.net_amount_pending_payment = (
    // parseFloat(inputs.total_voucher_data.PayableAmount) -
    // parseFloat(
    // inputs.voucher_identification_data.detraction.PaymentTerms
    // .Amount
    // )
    // ).toFixed(2);

    // var cuenta =
    // service.getCompanyDetail(companies).bank_accounts_soles[0]?.cta;

    // inputs.voucher_identification_data.detraction.PaymentMeans.PayeeFinancialAccountID =
    // cuenta ? cuenta : "";

    // inputs.voucher_identification_data.withholdings.withholdingRegime =
    // "NO AFECTO";
    // }
    // var flaIgv = service.getIgv(inputs, documents);

    // inputs.voucher_identification_data.igv = flaIgv ? flaIgv : "";

    // inputs.voucher_identification_data.divisa.exchangeRate = {
    // euro: _divisa.euro,
    // dollar: _divisa.dollar,
    // };

    setInputs((prevState) => ({
      ...prevState,
    }))
  }

  async function getLastInsertedDocument() {
    // var lastItem = 1;
    // const q = query(
    // collection(db, "sales_history"),
    // where("serie", "==", inputs.serie),
    // orderBy("correlative_number")
    // );
    // const querySnapshot = await getDocs(q);
    // var salesHistory = [];
    // querySnapshot.forEach((doc) => {
    // if (doc.data().CompanyId == service.getCompanyID(companies)) {
    // salesHistory.push(doc.data());
    // }
    // });

    // if (inputs.voucher_identification_data.number) {
    // if (
    //     salesHistory
    //       .map((o) => o.correlative_number)
    //       .includes(parseFloat(inputs.voucher_identification_data.number))
    // ) {
    //     return -2;
    // }
    // return inputs.voucher_identification_data.number;
    // }

    function between(x, min, max) {
      return x >= min && x <= max
    }

    // if (serieObj.serie !== serieObj.letraSerie && serieObj.desde) {
    // lastItem = parseFloat(serieObj.desde);
    // if (serieObj.hasta && serieObj.hasta) {
    // salesHistory = salesHistory.filter((value) =>
    // between(
    // value.correlative_number,
    // parseFloat(serieObj.desde),
    // parseFloat(serieObj.hasta)
    // )
    // );
    // } else {
    // if (serieObj.hasta) {
    // salesHistory = salesHistory.filter(
    // (value) =>
    // value.correlative_number >=
    // parseFloat(serieObj.desde)
    // );

    // if (!salesHistory.length) {
    // return lastItem;
    // }
    // }
    // }
    // } else {
    // // console.log(lastItem, serieObj.id, currentUser.companyUserDocuments);
    // getCorrelativeNumber();
    // if (
    // typeof salesHistory !== "undefined" &&
    // salesHistory.length > 0
    // ) {
    // var item = salesHistory
    // .sort((a, b) => a.correlative_number - b.correlative_number)
    // .pop();
    // lastItem =
    // item.correlative_number >= lastItem
    // ? item.correlative_number + 1
    // : lastItem;
    // }
    // return lastItem;
    // }
    // function getCorrelativeNumber() {
    // var lastItemCopy = 1;
    // currentUser.companyUserDocuments.map((o) => {
    // o.documentosVentas.map((docs) => {
    // if (
    // docs.id === serieObj.id &&
    // docs.serie === serieObj.serie &&
    // docs.hasta > lastItemCopy
    // ) {
    // lastItemCopy = docs.hasta;
    // }
    // });
    // });

    // if (lastItem != lastItemCopy) {
    // lastItem = parseFloat(lastItemCopy) + 1;
    // }
    // return lastItem;
    // }

    // if (typeof salesHistory !== "undefined" && salesHistory.length > 0) {
    // lastItem = salesHistory
    // .sort((a, b) => a.correlative_number - b.correlative_number)
    // .pop();
    // lastItem = lastItem.correlative_number;
    // lastItem = lastItem + 1;
    // }

    // if (serieObj && lastItem > parseFloat(serieObj.hasta)) {
    // lastItem = -1;
    // }
    // return lastItem;
  }

  async function executeTransaction(kardexProducts) {
    // const copyInputs = service.previewVoucher(inputs, companies);
    // var document = service.getDocumentInRealTime(copyInputs, documents);
    // var permitirMovimientoStock = service.checkDocumentPermissions(
    // document,
    // "permitirMovimientoStock"
    // );
    // var permitirMovimientoStockFlag = service.checkDocumentPermissions(
    // document,
    // "permitirMovimientoStockFlag"
    // );
    // var NoPermitirSalidaStockDocumentosReferenciados =
    // service.checkDocumentPermissions(
    // document,
    // "NoPermitirSalidaStockDocumentosReferenciados"
    // );
    // // console.log(copyInputs);
    // await service.update(
    // "sales_history",
    // copyInputs.timeStamp.toString(),
    // copyInputs
    // );
    // copyInputs.products?.map((value, index) => {
    // if (!value.kardex) {
    // delete copyInputs.products[index];
    // }
    // });
    // if (
    // permitirMovimientoStock &&
    // permitirMovimientoStockFlag === "salida" &&
    // NoPermitirSalidaStockDocumentosReferenciados &&
    // copyInputs.referenceDocument?.length
    // ) {
    // copyInputs.referenceDocument?.map((o) => {
    // var permitirMovimientoStock =
    // o.voucher_identification_data?.document
    // .permitirMovimientoStock;
    // var permitirMovimientoStockFlag =
    // o.voucher_identification_data?.document
    // .permitirMovimientoStockFlag;
    // copyInputs.products?.map((value, index) => {
    // if (
    // o.products
    // .map((product) => product.uuidv4)
    // .includes(value.uuidv4)
    // ) {
    // if (
    // permitirMovimientoStock &&
    // permitirMovimientoStockFlag === "salida"
    // ) {
    // delete copyInputs.products[index];
    // }
    // }
    // });
    // });
    // }
    // if (
    // permitirMovimientoStock &&
    // permitirMovimientoStockFlag === "ingreso"
    // ) {
    // var operation = "INGRESO DE STOCK";
    // kardexProducts = await service.executeTransaction(
    // copyInputs,
    // copyInputs.products,
    // [],
    // operation
    // );
    // // console.log(operation);
    // }
    // if (
    // permitirMovimientoStock &&
    // permitirMovimientoStockFlag === "salida"
    // ) {
    // var operation = "VENTA";
    // kardexProducts = await service.executeTransaction(
    // copyInputs,
    // copyInputs.products,
    // [],
    // operation
    // );
    // // console.log(operation);
    // }
    // window.localStorage.removeItem("salesCopy");
    // NotificationManager.success("Operación exitosa", "Info!", 3000);
    // return kardexProducts;
  }

  function getPermisionProductPrice() {
    var module = 'Ventas'
    var permission = 'Permitir elegir el precio de la lista desplegable'
    // return service.checkPermision(
    // currentUser.permissions,
    // module,
    // permission
    // );
  }
  const filteredProducts = useMemo(() => {
    if (searchByPackage) {
      return productPackages.filter((user) => {
        // console.log("productPackages filtering...");
        if (warehouseId != 'all') {
          return (
            user.warehouse_id === warehouseId &&
            user.nombre.includes(currentProduct?.toUpperCase())
          )
        }
        if (!isNaN(currentProduct)) {
          return user.serialCodes?.includes(currentProduct)
        } else {
          return user.nombre.includes(currentProduct?.toUpperCase())
        }
      })
    } else {
      return optionsP.filter((user) => {
        // console.log("optionsP filtering...");
        if (warehouseId != 'all') {
          return (
            user.warehouse_id === warehouseId &&
            user.nombre.includes(currentProduct?.toUpperCase())
          )
        }

        if (!isNaN(currentProduct)) {
          return user.serialCodes?.includes(currentProduct)
        } else {
          return user.nombre.includes(currentProduct?.toUpperCase())
        }
      })
    }
  }, [currentProduct, warehouseId, searchByPackage])

  // const voucher_type = {"BOLETA DE VENTA ELECTRÓNICA":"03","FACTURA ELECTRÓNICA":"01","NOTA DE CREDITO":"07","NOTA DE DEBITO":"08","PROFORMA":"10"}

  // ModalStocks
  const [optionTemp, setOptionTemp] = useState({})
  const [openModalStock, setOpenModalStock] = useState(false)

  const handleOpen = (e) => {
    setOpenModalStock(true)
    setOptionTemp(e)
  }

  const handleClose = () => {
    setOptionTemp({})
    setOpenModalStock(false)
  }

  return (
    <Box sx={{ flexGrow: 1,padding:5 }}>
      <Grid container spacing={1}>
        <Grid
          item
          xs={6}
          md={9}
          lg={2}
          //  style={{
          //    display: 'flex',
          //    justifyContent: 'center',
          //    alignItems: 'center',
          //    gap: 10,
          //    border: '1px solid rgb(102, 97, 97)',
          //  }}
          style={{ border: '1px solid rgb(102, 97, 97)' }}

        >
          <Autocomplete
            disableClearable
            size="small"
            fullWidth
            open={openC}
            onOpen={() => {
              setOpenC(true)
            }}
            inputValue={inputs.client.unknown_user}
            onChange={(event, newValue) => {
              if (
                inputs.voucher_identification_data.document_code === '01' &&
                newValue.tipoDocumento === 'DNI'
              ) {
                inputs.client.unknown_user = ''
                // NotificationManager.info(
                // "Para Factura se debe seleccionar un cliente con RUC",
                // "Info!",
                // 3000
                // );
                return false
              }

              inputs.client.customer_name = newValue.nombre
              inputs.client.sales_customer_address = newValue.direcciones
                ?.length
                ? newValue.direcciones[0]?.direccion
                : ''
              inputs.client.phone = newValue.telefonos?.length
                ? newValue.telefonos[0]?.numero
                : ''
              inputs.client.document_number = newValue.numeroDocumento
              inputs.client.type_document = newValue.tipoDocumento
              inputs.voucher_identification_data.serie = ''
              inputs.client.mail = newValue.correo
              inputs.client.unknown_user =
                newValue.nombre +
                ' - ' +
                newValue.tipoDocumento +
                ': ' +
                newValue.numeroDocumento
              setInputs((prevState) => ({
                ...prevState,
              }))
            }}
            onClose={() => {
              setOpenC(false)
            }}
            getOptionLabel={(option) =>
              option.nombre +
              ' - ' +
              option.tipoDocumento +
              ': ' +
              option.numeroDocumento
            }
            options={optionsC}
            loading={loadingC}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cliente"
                variant="outlined"
                onChange={(ev) => {
                  if (ev.target.value !== '' || ev.target.value !== null) {
                    inputs.client.unknown_user = ev.target.value
                    onChangeHandleClient(ev.target.value)
                    setInputs((prevState) => ({
                      ...prevState,
                    }))
                  }
                }}
              />
            )}
          /> 
          {/* <LookupDNIandRUC
							inputs={inputs}
							setInputs={setInputs}
						/> */} 
        </Grid>
        <Grid
          item
          xs={4}
          md={3}
          lg={2}
          style={{ border: '1px solid rgb(102, 97, 97)' }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} size="small">
            <DesktopDatePicker
              size="small"
              label="Fecha de emisión"
              // value={
              // 	inputs.voucher_identification_data
              // 		.date_issue
              // }
              inputFormat="DD/MM/YYYY"
              onChange={(e) => {
                var module = 'Ventas'
                var permission = 'Permitir Cambiar F.Emision'

                // if (
                // service.checkPermision(
                // currentUser.permissions,
                // module,
                // permission
                // )
                // ) {
                // inputs.voucher_identification_data.date_issue =
                // e.$d;
                // } else {
                // alert("permiso insuficiente");
                // }
                setInputs((prevState) => ({
                  ...prevState,
                }))
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  size="small"
                  onChange={(e) => {
                    var module = 'Ventas'
                    var permission = 'Permitir Cambiar F.Emision'

                    // if (
                    // !service.checkPermision(
                    // currentUser.permissions,
                    // module,
                    // permission
                    // )
                    // ) {
                    // inputs.voucher_identification_data.date_issue =
                    // Date.now();
                    // setInputs(
                    // (prevState) => ({
                    // ...prevState,
                    // })
                    // );
                    // }
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        
        <Grid item xs={12}           style={{ border: '1px solid rgb(102, 97, 97)' }}
 >
          {/* <Documents
							inputs={inputs}
							value={inputs}
							setInputs={setInputs}
							documents={documents}
							setSerieObj={setSerieObj}
							series={series}
							setSeries={setSeries}
						/> */}
            <TextField
            size='small'
  label="Tipo de documento"
  // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // }}
/>
        </Grid>
        <Grid item xs={12}           style={{ border: '1px solid rgb(102, 97, 97)' }}
>
          {/* <Serie
							inputs={inputs}
							documents={documents}
							serieObj={serieObj}
							setSerieObj={setSerieObj}
							series={series}
							setSeries={setSeries}
						/> */}
             <TextField
            size='small'
  label="Serie"
  
/>
        </Grid>
        <Grid item xs={12}           style={{ border: '1px solid rgb(102, 97, 97)' }}
>
          {/* <Serie
							inputs={inputs}
							documents={documents}
							serieObj={serieObj}
							setSerieObj={setSerieObj}
							series={series}
							setSeries={setSeries}
						/> */}
             <TextField
            size='small'
  label="Numero"
  
/>
        </Grid>
        {/* {!serieObj.desde && !serieObj.hasta && series.length > 0 && (
          <TextField
            size="small"
            sx={{ m: 0, width: 100 }}
            label="Numero"
            value={inputs.voucher_identification_data.number}
            type="number"
            onChange={(e) => {
              inputs.voucher_identification_data.number = e.target.value;
              setInputs((prevState) => ({ ...prevState }));
            }}
          />
        )} */}
        {/* {inputs.voucher_identification_data.document_code ===
						"08" && (
						<FormControl sx={{ width: 150 }} size="small">
							<InputLabel id="label-serie">
								Motivo nota de débito
							</InputLabel>
							<Select
								labelId="label-serie"
								id="simple-select-autowidthww"
								name="serie"
								label="Motivo nota de crédito"
								value={
									inputs.voucher_identification_data.nc_code
								}
								onChange={(e) => {
									var note_credito = {
										"01": "Intereses por mora",
										"02": "Aumento en valor",
										"03": "Penalidades/ otros conceptos ",
									};
									inputs.voucher_identification_data.nc_code =
										e.target.value;
									inputs.voucher_identification_data.reason =
										note_credito[e.target.value];
									setInputs((prevState) => ({
										...prevState,
									}));
								}}
							>
								<MenuItem value={"01"}>
									Intereses por mora
								</MenuItem>
								<MenuItem value={"02"}>
									Aumento en valor
								</MenuItem>
								<MenuItem value={"03"}>
									Penalidades / otros conceptos{" "}
								</MenuItem>
							</Select>
						</FormControl>
					)} */}
        {/* {inputs.voucher_identification_data.document_code ===
						"07" && (
						<FormControl sx={{ width: 150 }} size="small">
							<InputLabel id="label-serie">
								Motivo nota de crédito
							</InputLabel>
							<Select
								labelId="label-serie"
								id="simple-select-autowidthww"
								name="serie"
								label="Motivo nota de crédito"
								value={
									inputs.voucher_identification_data.nc_code
								}
								onChange={(e) => {
									var note_credito = {
										"01": "Anulación de la operación",
										"02": "Anulación por error en el ruc",
										"03": "Correción por error en la descripción",
										"04": "Descuento global",
										"05": "Descuento por item",
										"06": "Devolución total",
										"07": "Devolución por item",
										"08": "Bonificación",
										"09": "Disminución en el valor",
										10: "Otros conceptos",
									};
									inputs.voucher_identification_data.nc_code =
										e.target.value;
									inputs.voucher_identification_data.reason =
										note_credito[e.target.value];
									setInputs((prevState) => ({
										...prevState,
									}));
								}}
							>
					 
								<MenuItem value={"05"}>
									Descuento por item
								</MenuItem>
								<MenuItem value={"06"}>
									Devolución total
								</MenuItem>
								<MenuItem value={"07"}>
									Devolución por item
								</MenuItem>
								<MenuItem value={"08"}>Bonificación</MenuItem>
								<MenuItem value={"09"}>
									Disminución en el valor
								</MenuItem>
								<MenuItem value={"10"}>
									Otros conceptos
								</MenuItem>
							</Select>
						</FormControl>
					)} */}
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <Autocomplete
                disableClearable
                size="small"
                fullWidth
                open={openP}
                onOpen={() => {
                  setOpenP(true)
                }}
                value={{ nombre: currentProduct }}
                onInputChange={(event, value, reason) => {
                  setCurrentProduct(value)
                }}
                onChange={async (event, newValue) => {
                  // if (newValue && !searchByPackage) {
                  // var document =
                  // service.getDocumentInRealTime(
                  // inputs,
                  // documents
                  // );
                  // if (
                  // service.checkDocumentPermissions(
                  // document,
                  // "noPermitirVentaSinStock"
                  // ) &&
                  // !(
                  // newValue.warehouses[0]
                  // .stock > 0
                  // )
                  // ) {
                  // alert(
                  // "Según el documento seleccionado no se admiten productos sin stock"
                  // );
                  // return false;
                  // }
                  // // console.log(newValue);
                  // if (
                  // newValue.serialCodes.includes(
                  // currentProduct
                  // )
                  // ) {
                  // newValue.serialCodesSelected = [
                  // currentProduct,
                  // ];
                  // }
                  // inputs.products.push({
                  // ...newValue,
                  // uuidv4: uuidv4(),
                  // });
                  // var result = (
                  // parseFloat(total) +
                  // parseFloat(newValue.price)
                  // ).toFixed(2);
                  // setTotal(result);
                  // setInputs((prevState) => ({
                  // ...prevState,
                  // }));
                  // setCurrentProduct("");
                  // }
                  // if (newValue && searchByPackage) {
                  // await service.getProductsFromPackage(
                  // newValue,
                  // warehouses,
                  // productoDivisa,
                  // inputs,
                  // productPrice,
                  // unidades
                  // );
                  // onChangeInput();
                  // setInputs((prevState) => ({
                  // ...prevState,
                  // }));
                  // }
                }}
                onClose={() => {
                  setOpenP(false)
                }}
                getOptionLabel={(option) =>
                  typeof option === 'string' ? option : option.nombre
                }
                filterOptions={(options, state) => {
                  return filteredProducts
                }}
                options={optionsP}
                loading={loadingP}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Productos"
                    variant="outlined"
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    <Box component="li" {...props} key={option.uuidv4}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs="auto">
                          <Avatar
                            alt={option?.nombre}
                            src={option?.imagen}
                            sx={{
                              width: 50,
                              height: 50,
                            }}
                            variant="rounded"
                          />
                        </Grid>

                        <Grid
                          item
                          xs
                          sx={{
                            width: 'calc(100% - 44px)',
                            wordWrap: 'break-word',
                          }}
                        >
                          <Box component="span" sx={{ fontWeight: 'regular' }}>
                            {option.nombre +
                              ' - CA: ' +
                              option.codigoAnexo +
                              (option.serialCodes?.includes(currentProduct)
                                ? ' CB: ' + currentProduct
                                : '')}{' '}
                          </Box>
                          {!searchByPackage && (
                            <>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {'STOCK: ' + option.stock}{' '}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {'ALMACEN: ' +
                                  option.warehouse_description.toUpperCase()}{' '}
                              </Typography>
                            </>
                          )}{' '}
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            variant="outlined"
                            onMouseDown={(event) => {
                              event.preventDefault()
                              handleOpen(option)
                            }}
                          >
                            ver stock
                          </Button>{' '}
                        </Grid>
                      </Grid>
                    </Box>
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs="auto">
								<Tooltip
									title="Buscar por paquete"
									placement="top"
									arrow
								>
									<FormControlLabel
										style={{
											padding: "0px 0px",
										}}
										control={
											<Checkbox
												checked={searchByPackage}
												icon={
													<TakeoutDiningOutlinedIcon />
												}
												checkedIcon={
													<TakeoutDiningIcon />
												}
												onChange={(e) => {
													var document =
														service.getDocumentInRealTime(
															inputs,
															documents
														);
													if (
														!service.checkDocumentPermissions(
															document,
															"manejaModelos"
														)
													) {
														alert(
															"Permiso insuficiente para el documento de " +
																inputs
																	.voucher_identification_data
																	.voucher_type
														);
														return false;
													}

													setSearchByPackage(
														e.target.checked
													);
												}}
											/>
										}
										// label="PAQUETES"
									/>
								</Tooltip>
							</Grid> */}{' '}
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={4} lg={4}>
						<FormControl fullWidth size="small">
							<InputLabel id="label-precio">Precio</InputLabel>
							<Select
								disabled={getPermisionProductPrice() === true}
								size="small"
								labelId="label-precio"
								name="precio"
								value={productPrice}
								label="Precio"
								onChange={(e) => {
									setProductPrice(e.target.value);
								}}
							>
								{productPrices.map((element, index) => (
									<MenuItem key={index} value={element}>
										{element}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid> */}
        {/* <Grid item xs={12} md={8} lg={8}>
						<FormControl fullWidth size="small">
							<InputLabel id="label-serie">ALMACEN</InputLabel>
							<Select
								labelId="label-serie"
								id="simple-select-autowidth"
								name="warehouse"
								value={warehouseId}
								onChange={(e) => {
									setWarehouseId(e.target.value);
								}}
								label="ALMACEN"
							>
								<MenuItem key={"all"} value={"all"}>
									{"all"}
								</MenuItem>
								{warehouses.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.description}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid> */}
        {/* <Grid
						container
						item
						xs={12}
						md={6}
						lg={4}
						alignItems="center"
					>
						<Grid item xs={10}>
							<RetencionesRetracciones
								setInputs={setInputs}
								inputs={inputs}
								calculateTaxProducts={calculateTaxProducts}
								total={total}
							/>
						</Grid>
						<Grid item xs={2}>
							<QRCodeBar
								setOptionsP={setOptionsP}
								currentProduct={currentProduct}
								setCurrentProduct={setCurrentProduct}
								// onChangeHandleProduct={onChangeHandleProduct}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Others
							calculateTaxProducts={calculateTaxProducts}
							inputs={inputs}
							setInputs={setInputs}
							total={total}
							paymentConditions={paymentConditions}
							documents={documents}
						/>
					</Grid>
					<Grid item xs={12} md={12} lg={4}>
						<ReferenceDocument
							inputs={inputs}
							setInputs={setInputs}
							documents={documents}
							setAnchorEl={setAnchorEl}
							setIndexDivisa={setIndexDivisa}
							divisa={divisa}
							warehouses={warehouses}
						/>
					</Grid> */}
        {/* {anchorEl && (
						<Popper
							open={
								inputs.referenceDocument?.length ? true : false
							}
							anchorEl={anchorEl}
						>
							<Box
								sx={{
									border: 0,
									p: 1,
									bgcolor: "background.paper",
								}}
							>
								{"Documento ajunto: " +
									inputs.voucher_identification_data
										?.series_number_attached_voucher}
							</Box>
						</Popper>
					)} */}
        {/* <div className="product-wrapper-venta">
				<ProductsTable
					inputs={inputs}
					setInputs={setInputs}
					handleChangeRemoveProduct={handleChangeRemoveProduct}
					onChangeInput={onChangeInput}
					handleCheckControl={handleCheckControl}
					warehouses={warehouses}
					documents={documents}
				/>
			</div> */}
        {/* <div className="total-pay">
					<FormControlLabel
						sx={{ height: "1.5em", fontWeight: "700" }}
						control={
							<Checkbox
								disabled={!inputs.products.length}
								checked={incIgv}
								onChange={(e) => {
									if (
										service.checkPermision(
											currentUser.permissions,
											"Ventas",
											"Permitir Cambiar Incl/No Incl IGV"
										)
									) {
										handleIncIgv(e.target.checked);
										onChangeInput();
										setIncIgv(e.target.checked);
									} else {
										alert("permiso insuficiente");
									}
								}}
							/>
						}
						label="INC.IGV"
					/>

					<span className="ss">
						{"DESCUENTO"} &nbsp;&nbsp;&nbsp;&nbsp;
						{"-" +
							inputs.voucher_identification_data.divisa.flag +
							inputs.total_voucher_data.fullDiscount}{" "}
					</span>
					<span className="ss">
						{"IMPORTE BASE "}{" "}
						{inputs.voucher_identification_data.divisa.flag +
							(
								total /
								parseFloat(
									"1." + service.getIgv(inputs, documents)
								)
							).toFixed(2)}{" "}
					</span>
					<span className="ss">
						{"IGV " + service.getIgv(inputs, documents) + "%"}{" "}
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
						{inputs.voucher_identification_data.divisa.flag +
							(
								total -
								total /
									parseFloat(
										"1." + service.getIgv(inputs, documents)
									)
							).toFixed(2)}{" "}
					</span>
					<span className="ss">
						{"ICBPER "}{" "}
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						{inputs.voucher_identification_data.divisa.flag +
							(inputs.costbag > 0 ? inputs.costbag : "0.00")}{" "}
					</span>
					<span className="total">
						{"TOTAL "}{" "}
						{inputs.voucher_identification_data.divisa.flag +
							(
								parseFloat(total) + parseFloat(inputs.costbag)
							).toFixed(2)}{" "}
					</span>
				</div> */} 
      </Grid>
    </Box>
  )
}

export default NewSale
