import React, { useState, useEffect } from 'react';
import './HomeSearch.css';
import axios from 'axios';
import XLSX from 'xlsx';

import PropertyDetailsForm from '../../components/PropertyDetailsForm';
import RentEstimateForm from '../../components/RentEstimateForm';
import MortgageDetailsForm from '../../components/MortgageDetailsForm';
import ExpensesForm from '../../components/ExpensesForm';
import InfoToolTipIcon from '../../components/InfoToolTipIcon';
import ResetAllFieldsButton from '../../components/ResetAllFieldsButton';
import InfoModal from '../../components/InfoModal';

import { rent, currencyFormat, bathrooms} from '../../components/HomeSearchUtils.js';

function HomeSearch() {

    const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

    const [state, setState] = useState({
        propertyList: [],
        propType: null,
        priceMin: "",
        priceMax: "",
        beds: null,
        baths: null,
        // zip: "",
        city: null,
        stateCode: null,
        interestRate: 3,
        homeInsure: 100,
        propTax: 1.5,
        loanLength: 30,
        utilities: 150,
        vacancy: 7,
        capEx: 1,
        repairMaint: 1,
        other: 1,
    })

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
      
        return windowDimensions;
      }
    
    //This function takes in all of the property information, including address line, city, price, beds, baths
    // downpayment, mortgage, total payment, total expenses, rent, cashflow, cash on cash return on investment, total return on investment
    // and converts to CSV. It is immediately downloaded to the users computer.
    const toCsv = () => {
        var propertyArray = [];
        state.propertyList.map((property) => (
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
        XLSX.utils.book_append_sheet(workBook, workSheet, state.zip + " Results");
        XLSX.writeFile(workBook, state.zip + "_Results.xlsx");
    }

    function principal(property) {
        return property.price - (percentOrTotal === 'percent' ? property.price * (totalDownPayment/100) : totalDownPayment);
    }

    function firstExp() {
        return ((state.interestRate/100)/12) * Math.pow((1+((state.interestRate/100)/12)), state.loanLength*12);
    }
    
    function secondExp() {
        return Math.pow(1+((state.interestRate/100)/12), state.loanLength*12) - 1;
    }

    function mortgage(property) {
        return (principal(property) * firstExp()) / secondExp();
    }

    function downpayment(property) {
        return percentOrTotal === 'percent' ? property.price * (totalDownPayment/100) : totalDownPayment;
    }

    function totalPayment(property) {
        return parseFloat(mortgage(property)) + 
        parseFloat(state.homeInsure) + parseFloat(((state.propTax/100)*property.price)/12);
    }

    function totalExpenses(property) {
        var utilities = parseFloat(state.utilities);
        var vacancy = parseFloat(((state.vacancy/100) * monthlyRent));
        var repairMaint = parseFloat((((state.repairMaint/100) * property.price)/12));
        var capEx = parseFloat((((state.capEx/100) * property.price)/12));
        var other = parseFloat((((state.other/100) * property.price)/12));
        return  utilities + vacancy + repairMaint + capEx + other;
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

        if (state.propertyList !== []) {
            for (var index in state.propertyList) {
                var mapPhoto = document.getElementById(state.propertyList[index].property_id)
                
                if (mapPhoto != null ) {
                    if (mapPhoto.innerHTML !== null && mapPhoto.innerHTML !== "") {
                        return
                    } else {
                        try {
                            getMapPhoto(state.propertyList[index], mapPhoto)
                        } catch {
                            getMapPhoto(state.propertyList[index], mapPhoto)
                        }
                        
                    }
                }
            }
        }
        
    })

    const goToMap = (property) => {
        console.log(`${property.address.line},${property.address.city},${property.address.state}`);
        var options = {
            method: 'GET',
            url: 'https://map-api-dan.herokuapp.com/link',
            params: {
                'address': `${property.address.line},${property.address.city},${property.address.state}`
            },
            headers: {
                'Content-Type': 'text/plain',
            }
        };

        axios.request(options).then(function (response) {
            // console.log(response.data);
            if (response.data === "If you are seeing this, your address was likely invalid.") {
                alert("We were not able to get the Google maps link for this address.")
            } else {
                window.open(response.data, '_blank');
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    const getMapPhoto = (property, element) => {
        
        var options = {
            method: 'GET',
            url: 'https://map-api-dan.herokuapp.com/map',
            params: {
                'address': `${property.address.line},${property.address.city},${property.address.state}`
            },
            headers: {
                'Content-Type': 'text/plain',
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            if (response.data === "If you are seeing this, your address was likely invalid.") {
                element.innerHTML = 'The map for this location failed to load.'
                element.style.textAlign = "center";
            } else {
                element.innerHTML = response.data
            }
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
                // postal_code: state.zip,
                city: state.city,
                state_code: state.stateCode,
                offset: '0',
                limit: '20',
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
            if (response.data.properties === []) {
                alert("There were no properties that matched your search.")
            } else {
                setState({...state, propertyList: response.data.properties});
            }
        }).catch(function (error) {
            console.error(error);
        });
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

    //String Literals
    const title = 'RentalPropertyReturn.com';
    const exportButtonText = 'Export Search Results';


    return (
        <div className="container-fluid fill main-container">
            <div className="row title-row">
                <h1 className="title">{title}</h1>
            </div>    
            <div className="container-fluid fill search-body">
                <div className="row sub-title-row gx-0 mt-5">
                    <div className={(state.propertyList.length > 0 && (height > 700 && width > 1450)) ? 'col-1' : 'col-3'}></div>
                    <ResetAllFieldsButton 
                        setState = {setState}
                        state = {state}
                    />

                    <div className="col-3 d-flex justify-content-center">
                        < InfoModal />
                    </div>
                    <div className={state.propertyList.length > 0 ? 'col-4' : 'col-3'}></div>
                </div> 
                       
                <form onSubmit={handleSubmit}>
                    <div className="row"> 
                        <div className={(state.propertyList.length > 0  && (height > 700 && width > 1450)) ? 'col-8 p-5' : 'col-12 p-5'} > 
                            <PropertyDetailsForm
                                state={state}
                                setState={setState}
                            />
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-2 d-flex justify-content-center">
                        <button style={{display: state.propertyList.length > 0 ? 'flex' : 'none'}} onClick={(e) => { toCsv() }} className="text-nowrap btn btn-success btn-lg mt-3 mb-4">
                            {exportButtonText}</button>
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
                            rentPerRoom = {rentPerRoom}
                            setRentPerRoom = {setRentPerRoom}
                            totalRent = {totalRent}
                            setTotalRent = {setTotalRent}
                            rentWarning = {rentWarning}
                            setRentWarning = {setRentWarning}
                            setRoomOrTotal = {setRoomOrTotal}
                            setMonthlyRent = {setMonthlyRent}
                            height={height}
                            width={width}
                        />

                        <MortgageDetailsForm 
                            downPaymentPercent = {downPaymentPercent}
                            setDownPaymentPercent = {setDownPaymentPercent}
                            downPaymentTotal = {downPaymentTotal}
                            setDownPaymentTotal = {setDownPaymentTotal}
                            downPaymentWarning = {downPaymentWarning}
                            setTotalDownPayment = {setTotalDownPayment}
                            setPercentOrTotal = {setPercentOrTotal}
                            setDownPaymentWarning = {setDownPaymentWarning}
                            state = {state}
                            setState = {setState}
                        />

                        <ExpensesForm
                            state = {state}
                            setState = {setState}
                        />

                    </div> 
                  <div className ="row"></div>
                    <div className={(state.propertyList.length > 0 && height > 700 && width > 1450) ? "col-8" : "col-12"}>
                        {state.propertyList.sort((a,b) => totalRoi(b) - totalRoi(a)).map((property) => ( 
                            <div className="container fill main-container">
                                <div className="row property-container rounded "> 
                                    <div className="col-3 my-auto">
                                        <h3 className="text-center">{property.address.line}</h3>
                                        <h3 className="text-center">{property.address.city}</h3>
                                        <h3 className="text-center">${currencyFormat(property.price)}</h3>
                                        <h3 className="text-center">{property.beds} Bed, {property.baths_full, property.baths} Bath</h3>
                                    </div>
                                    <div className="col-2 my-auto p-0">
                                        <p className="bold text-center">Down Payment:<br></br> ${currencyFormat(downpayment(property))}</p>
                                        <p className="bold text-center">
                                            < InfoToolTipIcon height={20} weight={20} side={'left'} 
                                            text={'Mortgage payment per month'}/>Mortgage: <br></br>${currencyFormat(mortgage(property))}
                                        </p>
                                        <p className="bold text-center">
                                            < InfoToolTipIcon height={20} weight={20} side={'left'} 
                                            text={'Mortgage + Property Insurance + Property Tax per month'}/>Total Payment:<br></br> ${currencyFormat(totalPayment(property))}
                                        </p>
                                        <p className="bold text-center">
                                            < InfoToolTipIcon height={20} weight={20} side={'left'} 
                                            text={'Utilities + Vacancy + Repair/Maintenance + Capital Expenditures + Other Expenses per month'}/>Other Expenses:<br></br> ${currencyFormat(totalExpenses(property))}
                                        </p>
                                    </div>
                                    <div className="col-3 text-center my-auto">
                                        <p className="bold text-center">
                                            < InfoToolTipIcon height={20} weight={20} side={'left'} 
                                            text={'Total Payment + Other Expenses per month'}/>Total Expenses:<br></br> ${currencyFormat(totalExpenses(property) + totalPayment(property))}
                                        </p>
                                        <p className="bold text-left">Monthly Rent:<br></br> ${currencyFormat(rent(property.beds, roomOrTotal, monthlyRent))}</p>
                                        <p className="bold text-left">
                                            < InfoToolTipIcon height={20} weight={20} side={'left'} text={'Rental Income - Total Expenses per month'}/>Cash Flow:<br></br> ${currencyFormat(cashFlow(property))}
                                        </p>
                                        <p className="bold text-center">
                                            < InfoToolTipIcon height={20} weight={20} side={'left'} 
                                            text={'Cash Flow per year / (Downpayment + Closing Costs (Estimated at 3% of purchase price)). Assuming no repair costs.'}/>Cash on Cash ROI:<br></br> {currencyFormat(cocRoi(property))}%
                                        </p>
                                       
                                    </div>
                                    <div className="col-4 my-auto">
                                        <div className="col-12 d-flex justify-content-center">
                                            <button type="button" onClick={() => goToMap(property)} className="btn btn-dark btn-lg mb-2">See on Google Maps</button>
                                        </div>
                                        <div  id={property.property_id}>
                                        </div>
                                        <p className="bold text-center font-large text-center">
                                            < InfoToolTipIcon height={20} weight={20} side={'left'} 
                                            text={'(Cash Flow per year + Appreciation (Estimated 2% of purchase price) + Loan Pay Down (Estimated 1% of purchase price)) / (Downpayment + Closing Costs (Estimated at 3% of purchase price)). Assuming no repair costs.'}/>
                                            Total ROI:<br></br> <span style={{color: totalRoi(property) > 0 ? 'green' : 'red'}} className="text-shadow">
                                            {currencyFormat(totalRoi(property))}%</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div> 
                    <div className="col-4 fixed-top" style={{display: (state.propertyList.length > 0 && height > 700 && width > 1450) ? 'inline' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >
                        <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                        <RentEstimateForm
                            rentPerRoom = {rentPerRoom}
                            setRentPerRoom = {setRentPerRoom}
                            totalRent = {totalRent}
                            setTotalRent = {setTotalRent}
                            rentWarning = {rentWarning}
                            setRentWarning = {setRentWarning}
                            setRoomOrTotal = {setRoomOrTotal}
                            setMonthlyRent = {setMonthlyRent}
                            height={height}
                            width={width}
                        />
                        
                        <MortgageDetailsForm 
                            downPaymentPercent = {downPaymentPercent}
                            setDownPaymentPercent = {setDownPaymentPercent}
                            downPaymentTotal = {downPaymentTotal}
                            setDownPaymentTotal = {setDownPaymentTotal}
                            downPaymentWarning = {downPaymentWarning}
                            setTotalDownPayment = {setTotalDownPayment}
                            setPercentOrTotal = {setPercentOrTotal}
                            setDownPaymentWarning = {setDownPaymentWarning}
                            state = {state}
                            setState = {setState}
                        />

                        <ExpensesForm
                            state = {state}
                            setState = {setState}
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