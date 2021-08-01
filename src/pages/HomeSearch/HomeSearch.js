import React, { useState, useEffect, useCallback } from 'react';
import './HomeSearch.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import XLSX from 'xlsx';

import PropertyDetailsForm from '../../components/PropertyDetailsForm/PropertyDetailsForm';
import RentEstimateForm from '../../components/RentEstimateForm/RentEstimateForm';
import MortgageDetailsForm from '../../components/MortgageDetailsForm/MortgageDetailsForm';
import ExpensesForm from '../../components/ExpensesForm/ExpensesForm';
import InfoToolTipIcon from '../../components/InfoToolTipIcon';
import placeholderImage from '../../assets/images/placeholder-map.png';

import { rent, currencyFormat, bathrooms} from '../../components/HomeSearchUtils/HomeSearchUtils.js';

function HomeSearch() {

    const [propertyList, setPropertyList] = useState([]);
    // const [testPropertyList, setTestPropertyList] = useState([{'property': 'test1'}, {'propert': 'test2'}]);
    // const [propListLinks, setPropListLinks] = useState({});
    const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

    //Property Details  
    const [propType, setPropType] = useState(null);
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [beds, setBeds] = useState(null);
    const [baths, setBaths] = useState(null);
    const [zip, setZip] = useState("");

    //Rent Estimate
    const [monthlyRent, setMonthlyRent] = useState(null);
    const [rentPerRoom, setRentPerRoom] = useState(500);
    const [totalRent, setTotalRent] = useState(null);
    const [roomOrTotal, setRoomOrTotal] = useState(null);
    const [rentWarning, setRentWarning] = useState(false);

    //Mortgage Details
    const [downPaymentPercent, setDownPaymentPercent] = useState(3.5);
    const [downPaymentTotal, setDownPaymentTotal] = useState(null);
    const [totalDownPayment, setTotalDownPayment] = useState(null);
    const [percentOrTotal, setPercentOrTotal] = useState(null);
    const [downPaymentWarning, setDownPaymentWarning] = useState(null);
    const [interestRate, setInterestRate] = useState(3);
    const [homeInsure, setHomeInsure] = useState(100);
    const [propTax, setPropTax] = useState(1.5);
    const [loanLength, setLoanLength] = useState(30);

    //Expense Details
    const [utilities, setUtilities] = useState(150);
    const [vacancy, setVacancy] = useState(7);
    const [repairMaint, setRepairMaint] = useState(1);
    const [capEx, setCapEx] = useState(1);
    const [other, setOther] = useState(1); 

    const { height, width } = useWindowDimensions();

    //source: https://www.codegrepper.com/code-examples/javascript/reactjs+get+device+height
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
      
    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
      
        useEffect(() => {
          function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);

        // console.log(windowDimensions)
      
        return windowDimensions;
      }

    const toCsv = () => {
        var propertyArray = [];
        propertyList.map((property) => (
            propertyArray.push({
                "Address": property.address.line, 
                "City": property.address.city, 
                "Price": property.price, 
                "Beds": property.beds, 
                "Baths": bathrooms(property.baths_full, property.baths),
                "Downpayment": downpayment(property), 
                "Mortgage": mortgage(property), 
                "Total Payment": totalPayment(property), 
                "Total Expenses": totalExpenses(property), 
                "Rent": rent(property.beds, roomOrTotal, monthlyRent), 
                "CashFlow": cashFlow(property), 
                "COC ROI": cocRoi(property), 
                "Total ROI": totalRoi(property)
            })
        ))
        let workSheet = XLSX.utils.json_to_sheet(propertyArray);
        var workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, zip + " Results");
        XLSX.writeFile(workBook, zip + "_Results.xlsx");
    }

    function principal(property) {
        // console.log('principal: ', property.price - (percentOrTotal === 'percent' ? property.price * (totalDownPayment/100) : totalDownPayment) )
        return property.price - (percentOrTotal === 'percent' ? property.price * (totalDownPayment/100) : totalDownPayment);
    }

    function firstExp() {
        // console.log('firstExp: ', ((interestRate/100)/12) * Math.pow((1+((interestRate/100)/12)), loanLength*12))
        return ((interestRate/100)/12) * Math.pow((1+((interestRate/100)/12)), loanLength*12);
    }
    
    function secondExp() {
        // console.log('secondExp: ', Math.pow(1+((interestRate/100)/12), loanLength*12) - 1);
        return Math.pow(1+((interestRate/100)/12), loanLength*12) - 1;
    }

    function mortgage(property) {
        // console.log('mortgage: ', (principal(property) * firstExp()) / secondExp());
        return (principal(property) * firstExp()) / secondExp();
    }

    function downpayment(property) {
        // console.log('downpayment:', percentOrTotal === 'percent' ? property.price * (totalDownPayment/100) : totalDownPayment);
        return percentOrTotal === 'percent' ? property.price * (totalDownPayment/100) : totalDownPayment;
    }

    function totalPayment(property) {
        // console.log('totalPayment:', parseFloat(mortgage(property)) + 
        // parseFloat(homeInsure) + parseFloat(((propTax/100)*property.price)/12));
        return parseFloat(mortgage(property)) + 
        parseFloat(homeInsure) + parseFloat(((propTax/100)*property.price)/12);
    }

    function totalExpenses(property) {
        // console.log('totalExpenses:', parseFloat(utilities) + parseFloat(((vacancy/100) * monthlyRent)) + parseFloat((((repairMaint/100) * property.price)/12)) + 
        // parseFloat((((capEx/100) * property.price)/12)) + parseFloat((((other/100) * property.price)/12)));
        return parseFloat(utilities) + parseFloat(((vacancy/100) * monthlyRent)) + parseFloat((((repairMaint/100) * property.price)/12)) + 
        parseFloat((((capEx/100) * property.price)/12)) + parseFloat((((other/100) * property.price)/12));
    }
    
    function cashFlow(property) {
        // console.log('cashFlow:', rent(property.beds, roomOrTotal, monthlyRent) - (parseFloat(totalExpenses(property)) + 
        // parseFloat(totalPayment(property))));
        return rent(property.beds, roomOrTotal, monthlyRent) - (parseFloat(totalExpenses(property)) + 
        parseFloat(totalPayment(property)));
    }

    function cocRoi(property) {
        // console.log('cocRoi:', (cashFlow(property) * 12) / (downpayment(property) + (property.price*.03)) * 100);
        return (cashFlow(property) * 12) / (downpayment(property) + (property.price*.03)) * 100;
    }

    function totalRoi(property) {
        // console.log('totalRoi:', ((cashFlow(property) * 12) + (property.price*.02) + (property.price*.01)) / (downpayment(property) + (property.price*.03)) * 100)
        return ((cashFlow(property) * 12) + (property.price*.02) + (property.price*.01)) / (downpayment(property) + (property.price*.03)) * 100;
    }
    
    useEffect(() => {

        //Calculate Rent
        if (rentPerRoom === 0 || rentPerRoom === "") {
            setRentPerRoom(null);
        }
        if (totalRent === 0 || totalRent === "") {
            setTotalRent(null);
        }
        if (rentPerRoom != null && totalRent != null) {
            setRentWarning(true)
            setMonthlyRent(null);
            window.history.back();
        } else if (rentPerRoom === null ) {
            setRentWarning(false)
            setRoomOrTotal("total");
            setMonthlyRent(totalRent);
        } else {
            setRentWarning(false)
            setRoomOrTotal("room");
            setMonthlyRent(rentPerRoom);
        }

        //Calculate Downpayment
        if (downPaymentPercent === 0 || downPaymentPercent === "") {
            setDownPaymentPercent(null);
        }
        if (downPaymentTotal === 0 || downPaymentTotal === "") {
            setDownPaymentTotal(null);
        }
        if (downPaymentPercent != null && downPaymentTotal != null) {
            setDownPaymentWarning(true)
            setTotalDownPayment(null);
            window.history.back();
        } else if (downPaymentPercent === null ) {
            setDownPaymentWarning(false)
            setPercentOrTotal("total");
            setTotalDownPayment(downPaymentTotal);
        } else {
            setDownPaymentWarning(false)
            setPercentOrTotal("percent");
            setTotalDownPayment(downPaymentPercent);
        }
        
    })

    const testFunction = (property) => {
        console.log(`${property.address.line},${property.address.city},${property.address.state}`);
        var options = {
            method: 'GET',
            url: 'http://map-api-dan.herokuapp.com/link',
            params: {
                'address': `${property.address.line},${property.address.city},${property.address.state}`
            },
            headers: {
                'Content-Type': 'text/plain',
                // "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*"
            }
        };

        axios.request(options).then(function (response) {
            // console.log(response.data);
            window.open(response.data, '_blank');
        }).catch(function (error) {
            console.error(error);
        });
    }

    // const testFunction = ( ) => {
    //     console.log('running')
    // }

    // const goToLink = useCallback((e, property) => {
    //     console.log(`${property.address.line},${property.address.city},${property.address.state}`);
    //     e.preventDefault();
    //     var options = {
    //         method: 'GET',
    //         url: 'http://map-api-dan.herokuapp.com/link',
    //         params: {
    //             'address': `${property.address.line},${property.address.city},${property.address.state}`
    //         },
    //         headers: {
    //             'Content-Type': 'text/plain',
    //             // "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*"
    //         }
    //     };

    //     axios.request(options).then(function (response) {
    //         console.log(response.data);
    //         window.location.href = response.data;
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    // }, [], );

    // const getGeoMap = (property) => {
        
    //     var options = {
    //         method: 'GET',
    //         url: 'http://map-api-dan.herokuapp.com/map',
    //         params: {
    //             'address': `${property.address.line},${property.address.city},${property.address.state}`,
    //         },
    //         headers: {
    //             'Content-Type': 'text/plain',
    //             // "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*"
    //         }
    //     };

    //     axios.request(options).then(function (response) {
    //         console.log(response.data);
    //         return response.data;
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    // }

    // const getPropLinks = () => {
    //     var list = {}
    //     for (var prop in propertyList) {
    //         list[prop.property_id] = getGeoLink(prop);
    //     }
    //     console.log(list);     
        
    //     return list
    // }

    const handleSubmit = (e) => {

        //Get the properties based on details
        e.preventDefault();
        
        var options = {
            method: 'GET',
            url: 'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale',
            params: {
                postal_code: zip,
                offset: '0',
                limit: '10',
                sort: 'newest',
                prop_type: propType,
                baths_min: baths,
                beds_min: beds,
                price_min: priceMin,
                price_max: priceMax,
            },
            headers: {
              'x-rapidapi-key': '6d2e6db3c4msh2b3e81fd83339e4p1a705fjsncb84d9f6b95b',
              'x-rapidapi-host': 'realty-in-us.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setPropertyList(response.data.properties);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const clearForm = () => {
        setPropertyList([]);
        setPropType("");
        setPriceMin("");
        setPriceMax("");
        setBeds("");
        setBaths("");
        setZip("");

        //Rent Estimate
        setMonthlyRent("");
        setRentPerRoom("");
        setTotalRent("");
        setRoomOrTotal("");
        setRentWarning(false);

        //Mortgage Details
        setDownPaymentPercent("");
        setDownPaymentTotal("");
        setTotalDownPayment("");
        setPercentOrTotal("");
        setDownPaymentWarning("");
        setInterestRate("");
        setHomeInsure("");
        setPropTax("");
        setLoanLength("");

        //Expense Details
        setUtilities("");
        setVacancy("");
        setRepairMaint("");
        setCapEx("");
        setOther("");
    }

    //source: https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 700){
          setScrollToTopVisible(true)
        } 
        else if (scrolled <= 700){
          setScrollToTopVisible(false)
        }
      };

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    window.addEventListener('scroll', toggleVisible);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="container-fluid fill main-container">
            <div className="row title-row">
                <h1 className="title">RentalPropertyReturn.com</h1>
                {/* <div style= "width:100%;">
    <div style="position:relative;width:100%;height:0;padding-bottom:60%;"><span style="color:#565656">Make this Notebook Trusted to load map: File - Trust Notebook</span>
        <iframe src="about:blank" style= {{position:"absolute",width:"100%",height:"100%",left:"0",top:"0",border:"none !important"}} data-html="%3C%21DOCTYPE%20html%3E%0A%3Chead%3E%20%20%20%20%0A%20%20%20%20%3Cmeta%20http-equiv%3D%22content-type%22%20content%3D%22text/html%3B%20charset%3DUTF-8%22%20/%3E%0A%20%20%20%20%0A%20%20%20%20%20%20%20%20%3Cscript%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20L_NO_TOUCH%20%3D%20false%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20L_DISABLE_3D%20%3D%20false%3B%0A%20%20%20%20%20%20%20%20%3C/script%3E%0A%20%20%20%20%0A%20%20%20%20%3Cstyle%3Ehtml%2C%20body%20%7Bwidth%3A%20100%25%3Bheight%3A%20100%25%3Bmargin%3A%200%3Bpadding%3A%200%3B%7D%3C/style%3E%0A%20%20%20%20%3Cstyle%3E%23map%20%7Bposition%3Aabsolute%3Btop%3A0%3Bbottom%3A0%3Bright%3A0%3Bleft%3A0%3B%7D%3C/style%3E%0A%20%20%20%20%3Cscript%20src%3D%22https%3A//cdn.jsdelivr.net/npm/leaflet%401.6.0/dist/leaflet.js%22%3E%3C/script%3E%0A%20%20%20%20%3Cscript%20src%3D%22https%3A//code.jquery.com/jquery-1.12.4.min.js%22%3E%3C/script%3E%0A%20%20%20%20%3Cscript%20src%3D%22https%3A//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js%22%3E%3C/script%3E%0A%20%20%20%20%3Cscript%20src%3D%22https%3A//cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js%22%3E%3C/script%3E%0A%20%20%20%20%3Clink%20rel%3D%22stylesheet%22%20href%3D%22https%3A//cdn.jsdelivr.net/npm/leaflet%401.6.0/dist/leaflet.css%22/%3E%0A%20%20%20%20%3Clink%20rel%3D%22stylesheet%22%20href%3D%22https%3A//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css%22/%3E%0A%20%20%20%20%3Clink%20rel%3D%22stylesheet%22%20href%3D%22https%3A//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css%22/%3E%0A%20%20%20%20%3Clink%20rel%3D%22stylesheet%22%20href%3D%22https%3A//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css%22/%3E%0A%20%20%20%20%3Clink%20rel%3D%22stylesheet%22%20href%3D%22https%3A//cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css%22/%3E%0A%20%20%20%20%3Clink%20rel%3D%22stylesheet%22%20href%3D%22https%3A//cdn.jsdelivr.net/gh/python-visualization/folium/folium/templates/leaflet.awesome.rotate.min.css%22/%3E%0A%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20initial-scale%3D1.0%2C%20maximum-scale%3D1.0%2C%20user-scalable%3Dno%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%23map_3da15fe3f18e49fcb17664fd63d1e53b%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20position%3A%20relative%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20width%3A%20100.0%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20height%3A%20100.0%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20left%3A%200.0%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20top%3A%200.0%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/style%3E%0A%20%20%20%20%20%20%20%20%0A%3C/head%3E%0A%3Cbody%3E%20%20%20%20%0A%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22folium-map%22%20id%3D%22map_3da15fe3f18e49fcb17664fd63d1e53b%22%20%3E%3C/div%3E%0A%20%20%20%20%20%20%20%20%0A%3C/body%3E%0A%3Cscript%3E%20%20%20%20%0A%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20map_3da15fe3f18e49fcb17664fd63d1e53b%20%3D%20L.map%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22map_3da15fe3f18e49fcb17664fd63d1e53b%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20center%3A%20%5B30.56091656819136%2C%20-96.2991260868098%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20crs%3A%20L.CRS.EPSG3857%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20zoom%3A%2018%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20zoomControl%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20preferCanvas%3A%20false%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%29%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%0A%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20tile_layer_ec32dd9a5984412ba3a2261eec82cbf6%20%3D%20L.tileLayer%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22https%3A//%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%22attribution%22%3A%20%22Data%20by%20%5Cu0026copy%3B%20%5Cu003ca%20href%3D%5C%22http%3A//openstreetmap.org%5C%22%5Cu003eOpenStreetMap%5Cu003c/a%5Cu003e%2C%20under%20%5Cu003ca%20href%3D%5C%22http%3A//www.openstreetmap.org/copyright%5C%22%5Cu003eODbL%5Cu003c/a%5Cu003e.%22%2C%20%22detectRetina%22%3A%20false%2C%20%22maxNativeZoom%22%3A%2018%2C%20%22maxZoom%22%3A%2018%2C%20%22minZoom%22%3A%200%2C%20%22noWrap%22%3A%20false%2C%20%22opacity%22%3A%201%2C%20%22subdomains%22%3A%20%22abc%22%2C%20%22tms%22%3A%20false%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%29.addTo%28map_3da15fe3f18e49fcb17664fd63d1e53b%29%3B%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20marker_65e37fa4aa324f259396dd53640b98ee%20%3D%20L.marker%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5B30.56091656819136%2C%20-96.2991260868098%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%29.addTo%28map_3da15fe3f18e49fcb17664fd63d1e53b%29%3B%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%0A%20%20%20%20%20%20%20%20var%20popup_7d36971b229441e985efd775b7213855%20%3D%20L.popup%28%7B%22maxWidth%22%3A%20%22100%25%22%7D%29%3B%0A%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20html_78a66d9e5144473fab69dc3e811b34af%20%3D%20%24%28%60%3Cdiv%20id%3D%22html_78a66d9e5144473fab69dc3e811b34af%22%20style%3D%22width%3A%20100.0%25%3B%20height%3A%20100.0%25%3B%22%3E%3Ci%3E3813%20Oldenburg%20Lane%2CCollege%20Station%2CTX%3C/i%3E%3C/div%3E%60%29%5B0%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20popup_7d36971b229441e985efd775b7213855.setContent%28html_78a66d9e5144473fab69dc3e811b34af%29%3B%0A%20%20%20%20%20%20%20%20%0A%0A%20%20%20%20%20%20%20%20marker_65e37fa4aa324f259396dd53640b98ee.bindPopup%28popup_7d36971b229441e985efd775b7213855%29%0A%20%20%20%20%20%20%20%20%3B%0A%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%0A%3C/script%3E"
        onload="this.contentDocument.open();this.contentDocument.write(    decodeURIComponent(this.getAttribute('data-html')));this.contentDocument.close();" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
    </div>
</div> */}
            </div>    
            <div className="container-fluid fill search-body">
                <div className="row sub-title-row gx-0 mt-5">
                    <div className={(propertyList.length > 0 && (height > 700 && width > 1450)) ? 'col-1' : 'col-3'}></div>

                    <div className="col-3 d-flex justify-content-center">
                        <button type="button" onClick={(e) => {clearForm()}} className="btn btn-dark btn-lg">Reset all fields</button>
                    </div>

                    <div className="col-3 d-flex justify-content-center">
                        <button onClick={handleShow} type="button" data-toggle="modal" data-target="#infoModal" className="btn btn-light btn-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle p-0 m-0" viewBox="0 0 20 20">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                        &nbsp;How Does This Site Work?</button>
                    </div>
                    <div className={propertyList.length > 0 ? 'col-4' : 'col-3'}></div>
                </div> 

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{color: 'black'}}>
                        <b>1)&nbsp;</b>Fill in the property details to perform a property search.
                        <br></br>
                        <br></br>
                        <b>2)&nbsp;</b>Once the results are returned, you will be able to adjust the expected rent, expenses, and mortgage information on the right side of the screen.
                    </Modal.Body>
                </Modal>
                       
                <form onSubmit={handleSubmit}>
                    <div className="row"> 
                        <div className={(propertyList.length > 0  && (height > 700 && width > 1450)) ? 'col-8 p-5' : 'col-12 p-5'} > 
                            <PropertyDetailsForm
                                propType = {propType}
                                setPropType = {setPropType}
                                priceMin = {priceMin}
                                setPriceMin = {setPriceMin}
                                priceMax = {priceMax}
                                setPriceMax = {setPriceMax}
                                beds = {beds}
                                setBeds = {setBeds}
                                baths = {baths}
                                setBaths = {setBaths}
                                zip = {zip}
                                setZip = {setZip}
                            />
                        </div>
                        
                    </div>
                    {/* <div>
                        {propertyList.map((property) => (
                            <>
                            <p>{property['property']}</p>
                            <button type="button" onClick={(e) => {testFunction(e, property)}} className="btn btn-dark btn-lg">Test GeoCode</button>
                            </>
                        ))}
                    </div> */}
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-2 d-flex justify-content-center">
                        <button style={{display: propertyList.length > 0 ? 'flex' : 'none'}} onClick={(e) => { toCsv() }} className="text-nowrap btn btn-success btn-lg mt-3 mb-4">
                            Export Search Results</button>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2 d-flex justify-content-center">
                            <button type="submit" className="text-nowrap btn btn-danger btn-lg mt-3 mb-4">GET RESULTS</button>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2 d-flex justify-content-center"></div>
                        <div className="col-1"></div>
                    </div>

                 <div className="col-12 " style={{display: (propertyList.length > 0 && (height < 700 || width < 1450)) ? 'inline' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >

                        <RentEstimateForm
                            rentPerRoom = {rentPerRoom}
                            setRentPerRoom = {setRentPerRoom}
                            totalRent = {totalRent}
                            setTotalRent = {setTotalRent}
                            rentWarning = {rentWarning}
                        />

                        <MortgageDetailsForm 
                            downPaymentPercent = {downPaymentPercent}
                            setDownPaymentPercent = {setDownPaymentPercent}
                            downPaymentTotal = {downPaymentTotal}
                            setDownPaymentTotal = {setDownPaymentTotal}
                            downPaymentWarning = {downPaymentWarning}
                            interestRate = {interestRate}
                            setInterestRate = {setInterestRate}
                            homeInsure = {homeInsure}
                            setHomeInsure = {setHomeInsure}
                            propTax = {propTax}
                            setPropTax = {setPropTax}
                            loanLength = {loanLength}
                            setLoanLength = {setLoanLength}
                        />

                        <ExpensesForm
                            utilities = {utilities}
                            setUtilities = {setUtilities}
                            vacancy = {vacancy}
                            setVacancy = {setVacancy}
                            repairMaint = {repairMaint}
                            setRepairMaint = {setRepairMaint}
                            capEx = {capEx}
                            setCapEx = {setCapEx}
                            other = {other}
                            setOther = {setOther}
                        />

                    </div> 
                  <div className ="row"></div>
                    <div className={(propertyList.length > 0 && height > 700 && width > 1450) ? "col-8" : "col-12"}>
                        {propertyList.sort((a,b) => totalRoi(b) - totalRoi(a)).map((property) => ( 
                            <div className="container fill main-container">
                                <div className="row property-container rounded "> 
                                    <div className="col-3 my-auto">
                                        <h2 className="text-center">{property.address.line}</h2>
                                        <h3 className="text-center">{property.address.city}</h3>
                                        <h1 className="text-center">${currencyFormat(property.price)}</h1>
                                        <h3 className="text-center">{property.beds} Bed, {property.baths_full, property.baths} Bath</h3>
                                    </div>
                                    <div className="col-3 my-auto">
                                        <p className="bold text-left">Down Payment: ${currencyFormat(downpayment(property))}</p>
                                        <p className="bold text-left">
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/>Mortgage: ${currencyFormat(mortgage(property))}</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left">Total Payment: ${currencyFormat(totalPayment(property))}</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left">Total Expenses: ${currencyFormat(totalExpenses(property))}</p>
                                    </div>
                                    <div className="col-3 my-auto">
                                        <p className="bold text-left">Monthly Rent: ${currencyFormat(rent(property.beds, roomOrTotal, monthlyRent))}</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left">Cash Flow: ${currencyFormat(cashFlow(property))}</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left">Cash on Cash ROI: {currencyFormat(cocRoi(property))}%</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left font-large">Total ROI: <span 
                                            style={{color: totalRoi(property) > 0 ? 'green' : 'red'}} className="text-shadow">
                                            {currencyFormat(totalRoi(property))}%</span></p>
                                    </div>
                                    <div className="col-3 my-auto">
                                        <p>{property.address.line},{property.address.city},{property.address.state}</p>
                                        <button type="button" onClick={() => testFunction(property)} className="btn btn-dark btn-lg mb-2">Go to Link</button>
                                        {/* {"Links List:", console.log(propListLinks)}
                                        {console.log(propertyList)}  */}
                                        {/* <a class="link-primary" href={testFunction(property)}>Click Me.</a> */}
                                        {/* <img src={placeholderImage} class="img-fluid" alt="Map placeholder"></img> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div> 
                    <div className="col-4 fixed-top" style={{display: (propertyList.length > 0 && height > 700 && width > 1450) ? 'inline' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >
                        <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                        <RentEstimateForm
                            rentPerRoom = {rentPerRoom}
                            setRentPerRoom = {setRentPerRoom}
                            totalRent = {totalRent}
                            setTotalRent = {setTotalRent}
                            rentWarning = {rentWarning}
                        />
                        
                        <MortgageDetailsForm 
                            downPaymentPercent = {downPaymentPercent}
                            setDownPaymentPercent = {setDownPaymentPercent}
                            downPaymentTotal = {downPaymentTotal}
                            setDownPaymentTotal = {setDownPaymentTotal}
                            downPaymentWarning = {downPaymentWarning}
                            interestRate = {interestRate}
                            setInterestRate = {setInterestRate}
                            homeInsure = {homeInsure}
                            setHomeInsure = {setHomeInsure}
                            propTax = {propTax}
                            setPropTax = {setPropTax}
                            loanLength = {loanLength}
                            setLoanLength = {setLoanLength}
                        />

                        <ExpensesForm
                            utilities = {utilities}
                            setUtilities = {setUtilities}
                            vacancy = {vacancy}
                            setVacancy = {setVacancy}
                            repairMaint = {repairMaint}
                            setRepairMaint = {setRepairMaint}
                            capEx = {capEx}
                            setCapEx = {setCapEx}
                            other = {other}
                            setOther = {setOther}
                        />
                        </div>
                    </div>
                    <div className="row fixed-bottom">
                        <div className="col-5"></div>
                        <div className="col-2 d-flex justify-content-center">
                            <button type="" onClick={scrollToTop} style={{display: scrollToTopVisible ? 'flex' : 'none'}} 
                            className="btn btn-dark btn-lg mb-2">Back to Top</button>
                        </div>
                        <div className="col-5"></div>
                    </div>
            </form>
        </div>
    </div>
        

    )
}

export default HomeSearch;