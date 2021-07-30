
function MortgageDetailsForm(props) {

    return (

        <fieldset>
            <div className="row sub-title-row mt-0 mb-0">
                <div className="col-2"></div>
                <div className="col-8">
                    <legend><h4 className="subTitle">Monthly Mortgage Details</h4></legend>
                </div>
                <div className="col-2"></div>
            </div>
            
            
            <div className="form-group">
                <div className="text-center">
                    <label>Down Payment</label>                  
                </div>
                <div className="row">
                <div className="col-1"></div>
                    <div className="col-4">
                        <div className="input-group">
                            <input className="form-control" type="number" aria-describedby="downPaymentPercentAppend" 
                            value={props.state.downPaymentPercent} onChange={e => props.setState({...props.state, downPaymentPercent: e.target.value})}></input> 
                            <div class="input-group-append">
                                <span class="input-group-text" id="downPaymentPercentAppend">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 text-center">
                        <h5 className="text-center">OR</h5>
                    </div>
                    <div className="col-4">
                    
                    <div className="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="downPaymentDollarPrepend">$</span>
                        </div>
                        <input className="form-control" type="number" aria-describedby="downPaymentDollarPrepend" 
                        value={props.state.downPaymentTotal} onChange={e => props.setState({...props.state, downPaymentTotal: e.target.value})}></input>
                    </div>
                </div>
                <div className="col-1"></div>
                <p className="text-center">{props.state.downPaymentWarning ? "Please only enter Percent or Total, not both." : null}</p>
            </div>
            </div>

            <div className="row m-1">
                <div className="col-4">
                    <div className="form-group">
                        <div className="text-center">
                            <label>Interest Rate</label>
                        </div>
                        <div className="input-group">
                            <input className="form-control" type="number" aria-describedby="interestRateAppend" 
                            value={props.state.interestRate} onChange={e => props.setState({...props.state, interestRate: e.target.value})}></input>
                            <div class="input-group-append">
                                <span class="input-group-text" id="interestRateAppend">%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                
                <div className="col-4">
                    <div className="form-group">
                        <div className="text-center">
                            <label>Home Insurance</label>
                        </div>
                        <div className="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="homeInsureAppend">$</span>
                            </div>
                            <input className="form-control" type="number" aria-describedby="homeInsureAppend"
                            value={props.state.homeInsure} onChange={e => props.setState({...props.state, homeInsure: e.target.value})}></input>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <div className="text-center">
                            <label>Property Taxes</label>
                        </div>
                        <div className="input-group">
                            <input className="form-control" type="number" value={props.state.propTax} aria-describedby="propTaxAppend" 
                            onChange={e => props.setState({...props.state, propTax: e.target.value})}></input>
                            <div class="input-group-append">
                                <span class="input-group-text" id="propTaxAppend">%</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <div className="form-group">
                <div className="row mt-2">
                    <div className="text-center">
                        <label className="radio-title">Loan Term Length (years)</label>
                    </div>
                <div></div>
                <div className="col-3"></div>
                    <div className="col-6 d-flex justify-content-center">
                <div className="form-check form-check-inline">
                    <label className="form-check-label"  htmlFor="ten-year">10</label>
                    <input className="form-check-input" type="radio" name="loan-length" id="tenYear" checked={props.state.loanLength === 10}
                    onChange={e => props.setState({...props.state, loanLength: 10})}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label"  htmlFor="fifteen-year">15</label>
                    <input className="form-check-input" type="radio" name="loan-length" id="fifteenYear" checked={props.state.loanLength === 15}
                    onChange={e => props.setState({...props.state, loanLength: 15})}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label"  htmlFor="thirty-year">30</label>
                    <input className="form-check-input" type="radio" name="loan-length" id="thirtyYear" checked={props.state.loanLength === 30}
                    onChange={e => props.setState({...props.state, loanLength: 30})}></input>
                </div>
                </div>
                    <div className="col-3"></div>
                </div>
                
            </div>

        </fieldset>
    )
}

export default MortgageDetailsForm;