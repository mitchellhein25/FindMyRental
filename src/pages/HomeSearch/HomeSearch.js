import React, { useState, useEffect } from 'react';
import './HomeSearch.css';
import axios from 'axios';
import XLSX from 'xlsx';

import PropertyDetailsForm from '../../components/PropertyDetailsForm/PropertyDetailsForm';
import RentEstimateForm from '../../components/RentEstimateForm/RentEstimateForm';
import MortgageDetailsForm from '../../components/MortgageDetailsForm/MortgageDetailsForm';
import ExpensesForm from '../../components/ExpensesForm/ExpensesForm';
import InfoToolTipIcon from '../../components/InfoToolTipIcon';
import InfoModal from '../../components/InfoModal';
// import placeholderImage from '../../assets/images/placeholder-map.png';

// import { rent, currencyFormat, bathrooms} from '../../components/HomeSearchUtils/HomeSearchUtils.js';

function HomeSearch() {

    const [state, setState] = useState({
        propertyList: [],
        scrollToTopVisible: false,
        propType: null,
        priceMin: "",
        priceMax: "",
        beds: null,
        baths: null,
        zip: "",
        monthlyRent: null,
        rentPerRoom: 500,
        totalRent: null,
        roomOrTotal: null,
        rentWarning: false,
        downPaymentPercent: 3.5,
        downPaymentTotal: null,
        totalDownPayment: null,
        percentOrTotal: null,
        downPaymentWarning: null,
        interestRate: 3,
        homeInsure: 100,
        propTax: 1.5,
        loanLength: 30,
        utilities: 150,
        vacancy: 7,
        capEx: 1,
        repairMaint: 1,
        other: 1,
    });

    // const [propertyList, setPropertyList] = useState([]);
    // const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

    // //Property Details  
    // const [propType, setPropType] = useState(null);
    // const [priceMin, setPriceMin] = useState("");
    // const [priceMax, setPriceMax] = useState("");
    // const [beds, setBeds] = useState(null);
    // const [baths, setBaths] = useState(null);
    // const [zip, setZip] = useState("");

    // //Rent Estimate
    // const [monthlyRent, setMonthlyRent] = useState(null);
    // const [rentPerRoom, setRentPerRoom] = useState(500);
    // const [totalRent, setTotalRent] = useState(null);
    // const [roomOrTotal, setRoomOrTotal] = useState(null);
    // const [rentWarning, setRentWarning] = useState(false);

    // //Mortgage Details
    // const [downPaymentPercent, setDownPaymentPercent] = useState(3.5);
    // const [downPaymentTotal, setDownPaymentTotal] = useState(null);
    // const [totalDownPayment, setTotalDownPayment] = useState(null);
    // const [percentOrTotal, setPercentOrTotal] = useState(null);
    // const [downPaymentWarning, setDownPaymentWarning] = useState(null);
    // const [interestRate, setInterestRate] = useState(3);
    // const [homeInsure, setHomeInsure] = useState(100);
    // const [propTax, setPropTax] = useState(1.5);
    // const [loanLength, setLoanLength] = useState(30);

    // //Expense Details
    // const [utilities, setUtilities] = useState(150);
    // const [vacancy, setVacancy] = useState(7);
    // const [repairMaint, setRepairMaint] = useState(1);
    // const [capEx, setCapEx] = useState(1);
    // const [other, setOther] = useState(1); 

    // const { height, width } = useWindowDimensions();
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

    // const toCsv = () => {
    //     var propertyArray = [];
    //     state.propertyList.map((property) => (
    //         propertyArray.push({
    //             "Address": property.address.line, 
    //             "City": property.address.city, 
    //             "Price": property.price, 
    //             "Beds": property.beds, 
    //             "Baths": bathrooms(),
    //             "Downpayment": downpayment(property), 
    //             "Mortgage": mortgage(property), 
    //             "Total Payment": totalPayment(property), 
    //             "Total Expenses": totalExpenses(property), 
    //             "Rent": rent(property.beds, state.roomOrTotal, state.monthlyRent), 
    //             "CashFlow": cashFlow(property), 
    //             "COC ROI": cocRoi(property), 
    //             "Total ROI": totalRoi(property)
    //         })
    //     ))
    //     let workSheet = XLSX.utils.json_to_sheet(propertyArray);
    //     var workBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workBook, workSheet, state.zip + " Results");
    //     XLSX.writeFile(workBook, state.zip + "_Results.xlsx");
    // }

    // function principal(property) {
    //     return property.price - (state.percentOrTotal === 'percent' ? property.price * (state.totalDownPayment/100) : state.totalDownPayment);
    // }

    // function firstExp() {
    //     return ((state.interestRate/100)/12) * Math.pow((1+((state.interestRate/100)/12)), state.loanLength*12);
    // }
    
    // function secondExp() {
    //     return Math.pow(1+((state.interestRate/100)/12), state.loanLength*12) - 1;
    // }

    // function mortgage(property) {
    //     return (principal(property) * firstExp()) / secondExp();
    // }

    // function downpayment(property) {
    //     console.log(state.percentOrTotal)
    //     return state.percentOrTotal === 'percent' ? property.price * (state.totalDownPayment/100) : state.totalDownPayment;
    // }

    // function totalPayment(property) {
    //     return parseFloat(mortgage(property)) + 
    //     parseFloat(state.homeInsure) + parseFloat(((state.propTax/100)*property.price)/12);
    // }

    // function totalExpenses(property) {
    //     return parseFloat(state.utilities) + parseFloat(((state.vacancy/100) * state.monthlyRent)) + parseFloat((((state.repairMaint/100) * property.price)/12)) + 
    //     parseFloat((((state.capEx/100) * property.price)/12)) + parseFloat((((state.other/100) * property.price)/12));
    // }
    
    // function cashFlow(property) {
    //     return rent(property.beds, state.roomOrTotal, state.monthlyRent) - (parseFloat(totalExpenses(property)) + 
    //     parseFloat(totalPayment(property)));
    // }

    // function cocRoi(property) {
    //     return (cashFlow(property) * 12) / (downpayment(property) + (property.price*.03)) * 100;
    // }

    // function totalRoi(property) {
    //     console.log("totalroi: ", ((cashFlow(property) * 12) + (property.price*.02) + (property.price*.01)) / (downpayment(property) + (property.price*.03)) * 100)
    //     return ((cashFlow(property) * 12) + (property.price*.02) + (property.price*.01)) / (downpayment(property) + (property.price*.03)) * 100;
    // }

    // function bathrooms() {
    //     return state.baths_full < state.baths ? state.baths_full + state.baths_full - state.baths : state.baths_full;
    // }
    
    // function rent() {
    //     return state.roomOrTotal === 'room' ? state.beds * state.monthlyRent : state.monthlyRent;
    // }
    
    // function currencyFormat(x) {
    //     if (x) {
    //         x = x.toFixed(2);
    //         return x.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // source: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    //     }
    //     return x;
    // }
    
    useEffect(() => {

        //Calculate Rent
        if (state.rentPerRoom === 0 || state.rentPerRoom === "") {
            setState({...state, rentPerRoom: null});
        }
        if (state.totalRent === 0 || state.totalRent === "") {
            setState({...state, totalRent: null});
        }
        if (state.rentPerRoom != null && state.totalRent != null) {
            setState({...state, rentWarning: true});
            setState({...state, monthlyRent: null});
            window.history.back();
        } else if (state.rentPerRoom === null ) {
            setState({...state, rentWarning: false});
            setState({...state, roomOrTotal: "total"});
            setState({...state, monthlyRent: state.totalRent});
        } else {
            setState({...state, rentWarning: false});
            // setRentWarning(false)
            setState({...state, roomOrTotal: "room"});
            // setRoomOrTotal();
            setState({...state, monthlyRent: state.rentPerRoom});
            // setMonthlyRent(rentPerRoom);
        }

    }, [state.rentPerRoom, state.totalRent, state.roomOrTotal, state.monthlyRent, state.rentWarning])

    useEffect(() => {

        //Calculate Downpayment
        if (state.downPaymentPercent === 0 || state.downPaymentPercent === "") {
            setState({...state, downPaymentPercent: null});
            // setDownPaymentPercent(null);
        }
        if (state.downPaymentTotal === 0 || state.downPaymentTotal === "") {
            setState({...state, downPaymentTotal: null});
            // setDownPaymentTotal(null);
        }
        if (state.downPaymentPercent != null && state.downPaymentTotal != null) {
            setState({...state, downPaymentWarning: true});
            // setDownPaymentWarning(true)
            setState({...state, totalDownPayment: null});
            // setTotalDownPayment(null);
            window.history.back();
        } else if (state.downPaymentPercent === null ) {
            setState({...state, downPaymentWarning: false});
            // setDownPaymentWarning(false)
            setState({...state, percentOrTotal: "total"});
            // setPercentOrTotal("total");
            setState({...state, totalDownPayment: state.downPaymentTotal});
            // setTotalDownPayment(downPaymentTotal);
        } else {
            setState({...state, downPaymentWarning: false, percentOrTotal: "percent", totalDownPayment: state.downPaymentPercent});
            // setDownPaymentWarning(false)
            // setState({...state});
            // setPercentOrTotal("percent");
            // setState({...state});
            // setTotalDownPayment(downPaymentPercent);
        }

    }, [state.downPaymentPercent, state.downPaymentTotal, state.percentOrTotal, state.totalDownPayment, state.downPaymentWarning])

    // const getGeoLink = (property) => {
        
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
    //         return response.data;
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    // }

    const getGeoMap = (property) => {
        
        var options = {
            method: 'GET',
            url: 'http://map-api-dan.herokuapp.com/map',
            params: {
                'address': `${property.address.line},${property.address.city},${property.address.state}`,
            },
            headers: {
                'Content-Type': 'text/plain',
                // "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            return response.data;
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
                postal_code: state.zip,
                offset: '0',
                limit: '1000',
                sort: 'newest',
                prop_type: state.propType,
                baths_min: state.baths,
                beds_min: state.beds,
                price_min: state.priceMin,
                price_max: state.priceMax,
            },
            headers: {
              'x-rapidapi-key': '6d2e6db3c4msh2b3e81fd83339e4p1a705fjsncb84d9f6b95b',
              'x-rapidapi-host': 'realty-in-us.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setState({...state, propertyList: response.data.properties});
            console.log(state.propertyList)
            // setPropertyList(response.data.properties);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const clearForm = () => {
        setState({...state, propertyList: ""});
        // setPropertyList([]);
        setState({...state, propType: ""});
        // setPropType("");
        setState({...state, priceMin: ""});
        // setPriceMin("");
        setState({...state, priceMax: ""});
        // setPriceMax("");
        setState({...state, setBeds: ""});
        // setBeds("");
        setState({...state, setBaths: ""});
        // setBaths("");
        setState({...state, setZip: ""});
        // setZip("");

        //Rent Estimate
        setState({...state, monthlyRent: ""});
        // setMonthlyRent("");
        setState({...state, rentPerRoom: ""});
        // setRentPerRoom("");
        setState({...state, totalRent: ""});
        // setTotalRent("");
        setState({...state, roomOrTotal: ""});
        // setRoomOrTotal("");
        setState({...state, rentWarning: false});
        // setRentWarning(false);

        //Mortgage Details
        setState({...state, downPaymentPercent: ""});
        // setDownPaymentPercent("");
        setState({...state, downPaymentTotal: ""});
        // setDownPaymentTotal("");
        setState({...state, totalDownPayment: ""});
        // setTotalDownPayment("");
        setState({...state, percentOrTotal: ""});
        // setPercentOrTotal("");
        setState({...state, downPaymentWarning: ""});
        // setDownPaymentWarning("");
        setState({...state, interestRate: ""});
        // setInterestRate("");
        setState({...state, homeInsure: ""});
        // setHomeInsure("");
        setState({...state, propTax: ""});
        // setPropTax("");
        setState({...state, loanLength: ""});
        // setLoanLength("");

        //Expense Details
        setState({...state, utilities: ""});
        // setUtilities("");
        setState({...state, vacancy: ""});
        // setVacancy("");
        setState({...state, repairMaint: ""});
        // setRepairMaint("");
        setState({...state, capEx: ""});
        // setCapEx("");
        setState({...state, other: ""});
        // setOther("");
    }

    //source: https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 700){
            setState({...state, scrollToTopVisible: ""});
            // setScrollToTopVisible(true)
        } 
        else if (scrolled <= 700){
            setState({...state, scrollToTopVisible: ""});
            // setScrollToTopVisible(false)
        }
      };

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className="container-fluid fill main-container">
            <div className="row title-row">
                <h1 className="title">RentalPropertyReturn.com</h1>
            </div>      
            <div className="container-fluid fill search-body">
                <div className="row sub-title-row gx-0 mt-5">
                    <div className={(state.propertyList.length > 0  && (height > 700 && width > 1450)) ? 'col-1' : 'col-3'}></div>

                    <div className="col-3 d-flex justify-content-center">
                        <button type="" onClick={(e) => {clearForm()}} className="btn btn-dark btn-lg">Reset all fields</button>
                        {/* <button type="" onClick={(e) => {getGeoLink(e)}} className="btn btn-dark btn-lg">Test GeoCode</button> */}
                    </div>

                    <div className="col-3 d-flex justify-content-center">
                        < InfoModal />
                    </div>
                    <div className={state.propertyList.length > 0 ? 'col-4' : 'col-3'}></div>
                </div> 
                       
                <form onSubmit={handleSubmit}>
                    <div className="row"> 
                        <div className={(state.propertyList.length > 0  && (height > 700 && width > 1450)) ? 'col-8 p-5' : 'col-12 p-5'} > 
                            <PropertyDetailsForm
                                state = {state}
                                setState = {setState}
                            />
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-2 d-flex justify-content-center">
                        {/* <button style={{display: state.propertyList.length > 0 ? 'flex' : 'none'}} onClick={(e) => { toCsv() }} className="text-nowrap btn btn-success btn-lg mt-3 mb-4">
                            Export Search Results</button> */}
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2 d-flex justify-content-center">
                            <button type="submit" className="text-nowrap btn btn-danger btn-lg mt-3 mb-4">GET RESULTS</button>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2 d-flex justify-content-center"></div>
                        <div className="col-1"></div>
                    </div>

                    <div className="col-12 " style={{display: (state.propertyList.length > 0 && (height < 700 || width < 1450)) ? 'inline' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >

                        <RentEstimateForm
                            state = {state}
                            setState = {setState}
                            // rentPerRoom = {rentPerRoom}
                            // setRentPerRoom = {setRentPerRoom}
                            // totalRent = {totalRent}
                            // setTotalRent = {setTotalRent}
                            // rentWarning = {rentWarning}
                        />

                        <MortgageDetailsForm 
                            state = {state}
                            setState = {setState}
                            // downPaymentPercent = {downPaymentPercent}
                            // setDownPaymentPercent = {setDownPaymentPercent}
                            // downPaymentTotal = {downPaymentTotal}
                            // setDownPaymentTotal = {setDownPaymentTotal}
                            // downPaymentWarning = {downPaymentWarning}
                            // interestRate = {interestRate}
                            // setInterestRate = {setInterestRate}
                            // homeInsure = {homeInsure}
                            // setHomeInsure = {setHomeInsure}
                            // propTax = {propTax}
                            // setPropTax = {setPropTax}
                            // loanLength = {loanLength}
                            // setLoanLength = {setLoanLength}
                        />

                        <ExpensesForm
                            state = {state}
                            setState = {setState}
                            // utilities = {utilities}
                            // setUtilities = {setUtilities}
                            // vacancy = {vacancy}
                            // setVacancy = {setVacancy}
                            // repairMaint = {repairMaint}
                            // setRepairMaint = {setRepairMaint}
                            // capEx = {capEx}
                            // setCapEx = {setCapEx}
                            // other = {other}
                            // setOther = {setOther}
                        />

                    </div>
                
                    <div className ="row"></div>
                    {/* <div className={(state.propertyList.length > 0 && height > 700 && width > 1450) ? "col-8" : "col-12"}>
                        {/* {state.propertyList.sort((a,b) => totalRoi(b) - totalRoi(a)).map((property) => (  
                        {state.propertyList.map((property) => (
                            <div className="container fill main-container">
                                <div className="row property-container rounded "> 
                                    <div className="col-3 my-auto">
                                        <h2 className="text-center">{property.address.line}</h2>
                                        <h3 className="text-center">{property.address.city}</h3>
                                        {/* <h1 className="text-center">${currencyFormat(property.price)}</h1> *
                                        <h1 className="text-center">${property.price}</h1>
                                        <h3 className="text-center">{property.beds} Bed, {property.baths_full, property.baths} Bath</h3>
                                    </div>
                                    <div className="col-3 my-auto">
                                        {/* <p className="bold text-left">Down Payment: ${currencyFormat(state.percentOrTotal === 'percent' ? property.price * (state.totalDownPayment/100) : state.totalDownPayment)}</p>
                                        <p className="bold text-left">
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/>Mortgage: ${currencyFormat(mortgage(property))}</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left">Total Payment: ${currencyFormat(totalPayment(property))}</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left">Total Expenses: ${currencyFormat(totalExpenses(property))}</p> 
                                    </div>
                                    <div className="col-3 my-auto">
                                        {/* <p className="bold text-left">Monthly Rent: ${currencyFormat(rent())}</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left">Cash Flow: ${currencyFormat(cashFlow(property))}</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left">Cash on Cash ROI: {currencyFormat(cocRoi(property))}%</p>
                                        < InfoToolTipIcon height={20} weight={20} side={'left'} text={''}/><p className="bold text-left font-large">Total ROI: <span 
                                            style={{color: totalRoi(property) > 0 ? 'green' : 'red'}} className="text-shadow">
                                            {currencyFormat(totalRoi(property))}%</span></p> 
                                    </div>
                                    <div className="col-3 my-auto">
                                        {/* <a href={getGeoLink(property)}><p>Click This link!</p></a> 
                                        {/* <img src={placeholderImage} class="img-fluid" alt="Map placeholder"></img> 
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                    <div className="col-4 fixed-top" style={{display: (state.propertyList.length > 0 && height > 700 && width > 1450) ? 'inline' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >

                        <RentEstimateForm
                            state = {state}
                            setState = {setState}
                            // rentPerRoom = {rentPerRoom}
                            // setRentPerRoom = {setRentPerRoom}
                            // totalRent = {totalRent}
                            // setTotalRent = {setTotalRent}
                            // rentWarning = {rentWarning}
                        />
                        
                        <MortgageDetailsForm 
                            state = {state}
                            setState = {setState}
                            // downPaymentPercent = {downPaymentPercent}
                            // setDownPaymentPercent = {setDownPaymentPercent}
                            // downPaymentTotal = {downPaymentTotal}
                            // setDownPaymentTotal = {setDownPaymentTotal}
                            // downPaymentWarning = {downPaymentWarning}
                            // interestRate = {interestRate}
                            // setInterestRate = {setInterestRate}
                            // homeInsure = {homeInsure}
                            // setHomeInsure = {setHomeInsure}
                            // propTax = {propTax}
                            // setPropTax = {setPropTax}
                            // loanLength = {loanLength}
                            // setLoanLength = {setLoanLength}
                        />

                        <ExpensesForm
                            state = {state}
                            setState = {setState}
                            // utilities = {utilities}
                            // setUtilities = {setUtilities}
                            // vacancy = {vacancy}
                            // setVacancy = {setVacancy}
                            // repairMaint = {repairMaint}
                            // setRepairMaint = {setRepairMaint}
                            // capEx = {capEx}
                            // setCapEx = {setCapEx}
                            // other = {other}
                            // setOther = {setOther}
                        />

                    </div>
                    <div className="row fixed-bottom">
                        <div className="col-5"></div>
                        <div className="col-2 d-flex justify-content-center">
                            <button type="" onClick={scrollToTop} style={{display: state.scrollToTopVisible ? 'flex' : 'none'}} 
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