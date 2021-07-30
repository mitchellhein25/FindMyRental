

function PropertyDetailsForm(props) {

    return (
        <fieldset>
            <div className="row sub-title-row">
                <div className="col-3"></div>
                <div className="col-6">
                    <legend><h2 className="subTitle">Property Details</h2></legend>
                </div>
                <div className="col-3"></div>
            </div>

            
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 text-center">
                <label><p>Property Type</p></label>
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
                    <option value="single_family">Single Family</option>
                    <option value="multi_family">Multi-Family</option>
                    <option value="condo">Condo</option>
                    <option value="mobile">Mobile</option>
                    <option value="other">Other</option>
                </select>
            </div>
            </div>
                    <div className="col-3"></div>
                </div>

            <br></br>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 text-center">
                    <label><p>Purchase Price</p></label>
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
                            <option value="0">0</option>
                            <option value="50000">$50,000</option>
                            <option value="100000">$100,000</option>
                            <option value="150000">$150,000</option>
                            <option value="200000">$200,000</option>
                            <option value="300000">$300,000</option>
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
                            <option value="0">0</option>
                            <option value="50000">$50,000</option>
                            <option value="100000">$100,000</option>
                            <option value="150000">$150,000</option>
                            <option value="200000">$200,000</option>
                            <option value="300000">$300,000</option>
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
                            <label className="radio-title"><p>Bedrooms</p></label>
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
                            <label><p>Bathrooms</p></label>
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
                    <div className="col-4">
                        <div className="form-group">
                            <div className="text-center">
                                <label><p>Zip Code</p></label>
                            </div>
                            <input className="form-control" value={props.state.zip} 
                            onChange={e => props.setState({...props.state, zip: e.target.value})} type="text" pattern="[0-9]*"></input>
                        </div>
                    </div>
            <div className="col-4"></div>
            </div>
        </fieldset>
    )
}

export default PropertyDetailsForm;