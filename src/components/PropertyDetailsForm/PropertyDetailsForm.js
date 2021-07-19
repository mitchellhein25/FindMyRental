

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

            <div className="form-row">
                <label htmlFor="property-type">Property Type</label>
                <select className="form-control"
                value={props.propType} onChange={e => props.setPropType(e.target.value)}>
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
                        value={props.priceMin} onChange={e => props.setPriceMin(e.target.value)}></input>
                    </div>
                    TO
                    $
                    <div className="form-group col-5">
                        <input className="form-control" type="number" placeholder="Max"
                        value={props.priceMax} onChange={e => props.setPriceMax(e.target.value)}></input>
                    </div>
                </div>

            <br></br>
            
            <div className="form-group">
                <label className="radio-title">Bedrooms</label>
                <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="one-bed">1+</label>
                    <input className="form-check-input" type="radio" id="oneBed" checked={props.beds === 1}
                    onChange={e => props.setBeds(1)}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="two-bed">2+</label>
                    <input className="form-check-input" type="radio" id="twoBed" checked={props.beds === 2}
                    onChange={e => props.setBeds(2)}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="three-bed">3+</label>
                    <input className="form-check-input" type="radio" id="threeBed" checked={props.beds === 3}
                    onChange={e => props.setBeds(3)}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="four-bed">4+</label>
                    <input className="form-check-input" type="radio" id="fourBed" checked={props.beds === 4}
                    onChange={e => props.setBeds(4)}></input>
                </div>
            </div>

            <br></br>
            
            <div className="form-group">
                <label className="radio-title"><p>Bathrooms</p></label>
                <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="one-bath">1+</label>
                    <input className="form-check-input" type="radio" id="oneBath" checked={props.baths === 1}
                    onChange={e => props.setBaths(1)}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="two-bath">2+</label>
                    <input className="form-check-input" type="radio" id="twoBath" checked={props.baths === 2}
                    onChange={e => props.setBaths(2)}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="three-bath">3+</label>
                    <input className="form-check-input" type="radio" id="threeBath" checked={props.baths === 3}
                    onChange={e => props.setBaths(3)}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="four-bath">4+</label>
                    <input className="form-check-input" type="radio" id="fourBath" checked={props.baths === 4}
                    onChange={e => props.setBaths(4)}></input>
                </div>
            </div>
            
            <div className="form-group">
            <label>Zip Code</label>
            <div className="col-4">
                <input className="form-control" value={props.zip} 
                onChange={e => props.setZip(e.target.value)} type="text" pattern="[0-9]*"></input>
            </div>
            </div>

        </fieldset>
    )
}

export default PropertyDetailsForm;