function PropertyDetailsForm(props) {

    const title = 'Property Details';
    const propType = 'Property Type';
    const singleFamily= 'Single Family';
    const multiFamily = 'Multi-Family';
    const condo = 'Condo';
    const mobile = 'Mobile';
    const other = 'Other';
    const purchasePrice = 'Purchase Price';
    const bedrooms= 'Bedrooms';
    const bathrooms= 'Bathrooms';
    const city = 'City';
    const state = 'State'
    // const zipCode= 'Zip Code';

    return (
        <fieldset>
            <div className="row sub-title-row">
                <div className="col-3"></div>
                <div className="col-6">
                    <legend><h2 className="subTitle">{title}</h2></legend>
                </div>
                <div className="col-3"></div>
            </div>

            
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 text-center">
                <label><p>{propType}</p></label>
                </div>
                <div className="col-3"></div>
            </div>

            <div className="row">
                    <div className="col-3"></div>
                    <div  className="col-6">
                    <div className="form-group">
                <select className="form-control"
                value={props.state.propType} onChange={e => props.setState({...props.state, propType: e.target.value})}>
                    <option value="default" defaultValue>Choose...</option>
                    <option value="single_family">{singleFamily}</option>
                    <option value="multi_family">{multiFamily}</option>
                    <option value="condo">{condo}</option>
                    <option value="mobile">{mobile}</option>
                    <option value="other">{other}</option>
                </select>
            </div>
            </div>
                    <div className="col-3"></div>
                </div>

            <br></br>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 text-center">
                    <label><p>{purchasePrice}</p></label>
                </div>
                <div className="col-3"></div>
            </div>
                
                <div className="row">
                    <div className="col-3"></div>
                    <div  className="col-3">
                    
                    <div className="form-group">
                        
                        <select className="form-control" type="number"
                        value={props.state.priceMin} onChange={e => props.setState({...props.state, priceMin: e.target.value})}>
                            <option defaultValue>Min</option>
                            <option value="0">$0</option>
                            <option value="50000">$50,000</option>
                            <option value="100000">$100,000</option>
                            <option value="150000">$150,000</option>
                            <option value="200000">$200,000</option>
                            <option value="250000">$250,000</option>
                            <option value="300000">$300,000</option>
                            <option value="350000">$350,000</option>
                            <option value="400000">$400,000</option>
                            <option value="500000">$500,000</option>
                            <option value="600000">$600,000</option>
                            <option value="700000">$700,000</option>
                            <option value="800000">$800,000</option>
                            <option value="900000">$900,000</option>
                            <option value="1000000">$1,000,000</option>
                        </select>
                    
                    </div>
                    </div>
                    <div  className="col-3">
                    
                    
                    <div className="form-group">
                        <select className="form-control" type="number"
                        value={props.state.priceMax} onChange={e => props.setState({...props.state, priceMax: e.target.value})}>
                            <option defaultValue>Max</option>
                            <option value="0">$0</option>
                            <option value="50000">$50,000</option>
                            <option value="100000">$100,000</option>
                            <option value="150000">$150,000</option>
                            <option value="200000">$200,000</option>
                            <option value="250000">$250,000</option>
                            <option value="300000">$300,000</option>
                            <option value="350000">$350,000</option>
                            <option value="400000">$400,000</option>
                            <option value="500000">$500,000</option>
                            <option value="600000">$600,000</option>
                            <option value="700000">$700,000</option>
                            <option value="800000">$800,000</option>
                            <option value="900000">$900,000</option>
                            <option value="1000000">$1,000,000</option>
                        </select>
                    
                    </div>
                    </div>
                    <div className="col-3"></div>
                </div>

            <br></br>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="form-group">
                        <div className="text-center">
                            <label className="radio-title"><p>{bedrooms}</p></label>
                        </div>
                        <div></div>
                        <div className="d-flex justify-content-center">
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="one-bed">1+</label>
                            <input className="form-check-input" type="radio" id="oneBed" checked={props.state.beds === 1}
                            onChange={e => props.setState({...props.state, beds: 1})}></input>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="two-bed">2+</label>
                            <input className="form-check-input" type="radio" id="twoBed" checked={props.state.beds === 2}
                            onChange={e => props.setState({...props.state, beds: 2})}></input>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="three-bed">3+</label>
                            <input className="form-check-input" type="radio" id="threeBed" checked={props.state.beds === 3}
                            onChange={e => props.setState({...props.state, beds: 3})}></input>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="four-bed">4+</label>
                            <input className="form-check-input" type="radio" id="fourBed" checked={props.state.beds === 4}
                            onChange={e => props.setState({...props.state, beds: 4})}></input>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
            
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="form-group">
                        <div className="text-center">
                            <label><p>{bathrooms}</p></label>
                        </div>
                        
                        <div></div>
                        <div className="d-flex justify-content-center">
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="one-bath">1+</label>
                            <input className="form-check-input" type="radio" id="oneBath" checked={props.state.baths === 1}
                            onChange={e => props.setState({...props.state, baths: 1})}></input>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="two-bath">2+</label>
                            <input className="form-check-input" type="radio" id="twoBath" checked={props.state.baths === 2}
                            onChange={e => props.setState({...props.state, baths: 2})}></input>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="three-bath">3+</label>
                            <input className="form-check-input" type="radio" id="threeBath" checked={props.state.baths === 3}
                            onChange={e => props.setState({...props.state, baths: 3})}></input>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="four-bath">4+</label>
                            <input className="form-check-input" type="radio" id="fourBath" checked={props.state.baths === 4}
                            onChange={e => props.setState({...props.state, baths: 4})}></input>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
            <div className="row">
                <div className="col-4"></div>
                    <div className="col-2">
                        <div className="form-group">
                            <div className="text-center">
                                <label><p>{city}</p></label>
                            </div>
                            <input className="form-control" value={props.state.city} 
                            onChange={e => props.setState({...props.state, city: e.target.value})} type="text"></input>
                        </div>
                    </div>
                    <div className="col-1">
                        <div className="form-group">
                            <div className="text-center">
                                <label><p>{state}</p></label>
                            </div>
                            <select className="form-control" type="number"
                            value={props.state.stateCode} onChange={e => props.setState({...props.state, stateCode: e.target.value})}>
                                <option defaultValue>Choose..</option>
                                <option value="">N/A</option>
                                <option value="AK">Alaska</option>
                                <option value="AL">Alabama</option>
                                <option value="AR">Arkansas</option>
                                <option value="AZ">Arizona</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DC">District of Columbia</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="IA">Iowa</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MD">Maryland</option>
                                <option value="ME">Maine</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MO">Missouri</option>
                                <option value="MS">Mississippi</option>
                                <option value="MT">Montana</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="NE">Nebraska</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NV">Nevada</option>
                                <option value="NY">New York</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VA">Virginia</option>
                                <option value="VT">Vermont</option>
                                <option value="WA">Washington</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WV">West Virginia</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                    </div>
            <div className="col-4"></div>
            </div>
        </fieldset>
    )
}

export default PropertyDetailsForm;