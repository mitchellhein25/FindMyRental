import React, { useState } from 'react';
import './HomeSearch.css';
import axios from 'axios';

function HomeSearch() {

    const [propType, setPropType] = useState(null);
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [beds, setBeds] = useState(null);
    const [baths, setBaths] = useState(null);
    const [zip, setZip] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        var options = {
            method: 'GET',
            url: 'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale',
            params: {
                postal_code: zip,
                offset: '0',
                limit: '50',
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
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <div className="container fill main-container">
            <div className="row title-row">
                <h1 className="title">Find My Rental</h1>
            </div>      
            <div className="container fill search-body">
                <div className="row sub-title-row">
                    <div className="col-5"></div>
                    <div className="col-2 d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark btn-lg">RESET</button>
                    </div>
                    <div className="col-5"></div>
                    
                </div> 
                       
                <form onSubmit={handleSubmit}>
                <div className="row"> 
                    <div className="col-6"> 
                        <fieldset>
                            <div className="row sub-title-row">
                                <div className="col-3"></div>
                                <div className="col-6">
                                    <legend><h2 className="subTitle">Property Details</h2></legend>
                                </div>
                                <div className="col-3"></div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="property-type">Property Type</label>
                                <select className="form-control"
                                value={propType} onChange={e => setPropType(e.target.value)}>
                                    <option defaultValue>Choose...</option>
                                    <option value="single_family">Single Family</option>
                                    <option value="multi_family">Multi-Family</option>
                                    <option value="condo">Condo</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <br></br>
                            
                                <label>Purchase Price</label>
                                <div className="row">
                                    $
                                    <div className="form-group col-5">
                                        <input className="form-control" type="number" placeholder="Min"
                                        value={priceMin} onChange={e => setPriceMin(e.target.value)}></input>
                                    </div>
                                    TO
                                    $
                                    <div className="form-group col-5">
                                        <input className="form-control" type="number" placeholder="Max"
                                        value={priceMax} onChange={e => setPriceMax(e.target.value)}></input>
                                    </div>
                                </div>

                            <br></br>
                            
                            <div className="form-group">
                                <label className="radio-title">Bedrooms</label>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="one-bed">1+</label>
                                    <input className="form-check-input" type="radio" id="oneBed" checked={beds === 1}
                                    onChange={e => setBeds(1)}></input>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="two-bed">2+</label>
                                    <input className="form-check-input" type="radio" id="twoBed" checked={beds === 2}
                                    onChange={e => setBeds(2)}></input>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="three-bed">3+</label>
                                    <input className="form-check-input" type="radio" id="threeBed" checked={beds === 3}
                                    onChange={e => setBeds(3)}></input>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="four-bed">4+</label>
                                    <input className="form-check-input" type="radio" id="fourBed" checked={beds === 4}
                                    onChange={e => setBeds(4)}></input>
                                </div>
                            </div>

                            <br></br>
                            
                            <div className="form-group">
                                <label className="radio-title"><p>Bathrooms</p></label>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="one-bath">1+</label>
                                    <input className="form-check-input" type="radio" id="oneBath" checked={baths === 1}
                                    onChange={e => setBaths(1)}></input>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="two-bath">2+</label>
                                    <input className="form-check-input" type="radio" id="twoBath" checked={baths === 2}
                                    onChange={e => setBaths(2)}></input>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="three-bath">3+</label>
                                    <input className="form-check-input" type="radio" id="threeBath" checked={baths === 3}
                                    onChange={e => setBaths(3)}></input>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="four-bath">4+</label>
                                    <input className="form-check-input" type="radio" id="fourBath" checked={baths === 4}
                                    onChange={e => setBaths(4)}></input>
                                </div>
                            </div>
                            
                            <div className="form-group">
                            <label>Zip Code</label>
                            <div className="col-4">
                                <input className="form-control" value={zip} 
                                onChange={e => setZip(e.target.value)} type="text" pattern="[0-9]*"></input>
                            </div>
                            </div>

                        </fieldset>

                        <fieldset>
                            <div className="row sub-title-row mt-5">
                                <div className="col-3"></div>
                                <div className="col-6">
                                    <legend><h2 className="subTitle">Rent Estimate</h2></legend>
                                </div>
                                <div className="col-3"></div>
                            </div>
                            

                            <div className="form-group">
                                <label>Projected Monthly Rent</label>
                                <div className="row">
                                    $
                                    <div className="col-5">
                                        <input className="form-control" type="number" id="perRoom"></input>
                                        <div>
                                            <small className="form-text text-muted">
                                                <p id="helpBlock" >Per Room</p>
                                            </small>
                                        </div>
                                    </div>
                                    OR
                                    $
                                    <div className="col-5">
                                        <input className="form-control" type="number"id="totalRent"></input> 
                                        <div>
                                            <small className="form-text text-muted">
                                                <p id="helpBlock" >Total</p>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </fieldset>

                        </div>
                    
                    <div className="col-6">
                        <fieldset>
                            <div className="row sub-title-row">
                                <div className="col-3"></div>
                                <div className="col-6">
                                    <legend><h2 className="subTitle">Mortgage</h2></legend>
                                </div>
                                <div className="col-3"></div>
                            </div>
                            
                            
                            <div className="form-group">
                                <label>Down Payment</label>
                                <div className="row">
                                    <div className="col-5">
                                        <input className="form-control" type="number"></input> 
                                    </div>
                                    %
                                    OR
                                    $
                                    <div className="col-5">
                                        <input className="form-control" type="number"></input>
                                    </div>
                                </div>
                            </div>

                            <br></br>
                            
                            <div className="form-group">
                                <label>Interest Rate (estimated)</label>
                                <div className="row">
                                    <div className="col-2">
                                        <input className="form-control" type="number"></input>
                                    </div>
                                    %
                                </div>
                            </div>

                            <br></br>
                            
                            <div className="form-group">
                                <label className="radio-title">Loan Term Length (years)</label>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label"  htmlFor="ten-year">10</label>
                                    <input className="form-check-input" type="radio" name="loan-length" id="tenYear" value="ten"></input>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label"  htmlFor="fifteen-year">15</label>
                                    <input className="form-check-input" type="radio" name="loan-length" id="fifteenYear" value="fifteen"></input>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label"  htmlFor="thirty-year">30</label>
                                    <input className="form-check-input" type="radio" name="loan-length" id="thirtyYear" value="thirty"></input>
                                </div>
                            </div>

                        </fieldset>

                        <fieldset>
                            <div className="row sub-title-row">
                                <div className="col-3"></div>
                                <div className="col-6">
                                    <legend><h2 className="subTitle">Expenses</h2></legend>
                                </div>
                                <div className="col-3"></div>
                            </div>
                            
                            <div className="row">
                                <div className="col-3"></div>
                                <div className="col-5">
                                    <label>Utilities (estimated)</label>
                                </div>
                                <div className="col-3"></div>
                            </div>
                            <div className="row">
                                <div className="col-3"></div>
                                $
                                <div className="col-5">
                                    <input className="form-control" type="number"></input>
                                </div>
                                <div className="col-3"></div>
                            </div>

                            <br></br>
                            
                            <div className="row">
                                <div className="col-5">
                                    <label>Vacancy</label>
                                    <input className="form-control" type="number"></input>
                                </div>
                                <br></br>
                                %
                                <div className="col-5">
                                    <label>Capital Expenditures</label>
                                    <input className="form-control" type="number"></input>
                                </div>
                                <br></br>
                                %
                            </div>

                            <br></br>
                            
                            
                            <div className="row">
                                <div className="col-5">
                                    <label>Repairs and Maintenance</label>
                                    <input className="form-control" type="number"></input>
                                </div>
                                <br></br>
                                %
                                <div className="col-5">
                                    <label>Other (PM, HOA, etc.)</label>
                                    <input className="form-control" type="number"></input>
                                </div>
                                <br></br>
                                %
                            </div>

                        </fieldset>

                        
                    </div>
                    </div>
                

                <div className="row">
                    <div className="col-5"></div>
                    <div className="col-2 d-flex justify-content-center">
                        <button type="submit" className="btn btn-danger btn-lg mt-3 mb-4">GET RESULTS</button>
                    </div>
                    <div className="col-5"></div>
                </div>
                </form>
            </div>
        </div>
        

    )
}

export default HomeSearch;