import React, { useEffect } from 'react';
function MortgageDetailsForm(props) {

    const title = 'Monthly Mortgage Details';
    const downPayment = 'Down Payment';
    const interestRate = 'Interest Rate';
    const homeInsure = 'Home Insurance';
    const propTax = 'Property Taxes';
    const loanTermLength = 'Loan Term Length (years)';
    const warning = 'Please only enter Percent or Total, not both.';

    useEffect(() => {
        //Calculate Downpayment
        if (props.downPaymentPercent === 0 || props.downPaymentPercent === "") {
            props.setDownPaymentPercent(null);
        }
        if (props.downPaymentTotal === 0 || props.downPaymentTotal === "") {
            props.setDownPaymentTotal(null);
        }
        if (props.downPaymentPercent != null && props.downPaymentTotal != null) {
            props.setDownPaymentWarning(true)
            props.setTotalDownPayment(null);
        } else if (props.downPaymentPercent === null && props.downPaymentTotal === null){
            props.setTotalDownPayment(0);
        }else if (props.downPaymentPercent === null ) {
            props.setDownPaymentWarning(false)
            props.setPercentOrTotal("total");
            props.setTotalDownPayment(props.downPaymentTotal);
        } else if (props.downPaymentTotal === null) {
            props.setDownPaymentWarning(false)
            props.setPercentOrTotal("percent");
            props.setTotalDownPayment(props.downPaymentPercent);
        }
    });

    return (

        <fieldset>
            <div className="row sub-title-row mt-0 mb-0">
                <div className="col-2"></div>
                <div className="col-8">
                    <legend><h4 className="subTitle">{title}</h4></legend>
                </div>
                <div className="col-2"></div>
            </div>
            
            
            <div className="form-group">
                <div className="text-center">
                    <label>{downPayment}</label>                  
                </div>
                <div className="row">
                <div className="col-1"></div>
                    <div className="col-4">
                        <div className="input-group">
                            <input className="form-control" type="number" aria-describedby="downPaymentPercentAppend" 
                            value={props.downPaymentPercent} onChange={(e) => props.setDownPaymentPercent(e.target.value)}></input> 
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
                        value={props.downPaymentTotal} onChange={(e) => props.setDownPaymentTotal(e.target.value)}></input>
                    </div>
                </div>
                <div className="col-1"></div>
                <p className="text-center">{props.downPaymentWarning ? {warning} : null}</p>
            </div>
            </div>

            <div className="row m-1">
                <div className="col-4">
                    <div className="form-group">
                        <div className="text-center">
                            <label>{interestRate}</label>
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
                            <label>{homeInsure}</label>
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
                            <label>{propTax}</label>
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
                        <label className="radio-title">{loanTermLength}</label>
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