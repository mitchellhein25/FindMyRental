import React, { useState, useEffect } from 'react';
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
        return property.price - (percentOrTotal === 'percent' ? property.price * (totalDownPayment/100) : totalDownPayment);
    }

    function firstExp() {
        return ((interestRate/100)/12) * Math.pow((1+((interestRate/100)/12)), loanLength*12);
    }
    
    function secondExp() {
        return Math.pow(1+((interestRate/100)/12), loanLength*12) - 1;
    }

    function mortgage(property) {
        return (principal(property) * firstExp()) / secondExp();
    }

    function downpayment(property) {
        return percentOrTotal === 'percent' ? property.price * (totalDownPayment/100) : totalDownPayment;
    }

    function totalPayment(property) {
        return parseFloat(mortgage(property)) + 
        parseFloat(homeInsure) + parseFloat(((propTax/100)*property.price)/12);
    }

    function totalExpenses(property) {
        return parseFloat(utilities) + parseFloat(((vacancy/100) * monthlyRent)) + parseFloat((((repairMaint/100) * property.price)/12)) + 
        parseFloat((((capEx/100) * property.price)/12)) + parseFloat((((other/100) * property.price)/12));
    }
    
    function cashFlow(property) {
        return rent(property.beds, roomOrTotal, monthlyRent) - (parseFloat(totalExpenses(property)) + 
        parseFloat(totalPayment(property)));
    }

    function cocRoi(property) {
        return (cashFlow(property) * 12) / (downpayment(property) + (property.price*.03)) * 100;
    }

    function totalRoi(property) {
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

    const getGeoLink = (e) => {
        //Get the properties based on details
        e.preventDefault();
        
        var options = {
            method: 'GET',
            url: 'http://map-api-dan.herokuapp.com/link',
            params: {
                'address': '3813 Oldenburg Lane, College Station, TX' ,
            },
            headers: {
                'Content-Type': 'text/plain'
            //   'x-rapidapi-key': '6d2e6db3c4msh2b3e81fd83339e4p1a705fjsncb84d9f6b95b',
            //   'x-rapidapi-host': 'realty-in-us.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const handleSubmit = (e) => {

        //Get the properties based on details
        e.preventDefault();
        
        var options = {
            method: 'GET',
            url: 'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale',
            params: {
                postal_code: zip,
                offset: '0',
                limit: '1000',
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
            </div>      
            <div className="container-fluid fill search-body">
                <div className="row sub-title-row gx-0 mt-5">
                    <div className={(propertyList.length > 0  && (height > 700 && width > 1450)) ? 'col-1' : 'col-3'}></div>

                    <div className="col-3 d-flex justify-content-center">
                        <button type="" onClick={(e) => {clearForm()}} className="btn btn-dark btn-lg">Reset all fields</button>
                        <button type="" onClick={(e) => {getGeoLink(e)}} className="btn btn-dark btn-lg">Test GeoCode</button>
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
                                        <img src={placeholderImage} class="img-fluid" alt="Map placeholder"></img>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-4 fixed-top" style={{display: (propertyList.length > 0 && height > 700 && width > 1450) ? 'inline' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >

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