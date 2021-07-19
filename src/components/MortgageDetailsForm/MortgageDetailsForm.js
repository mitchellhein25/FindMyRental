
function MortgageDetailsForm(props) {

    return (

        <fieldset>
            <div className="row sub-title-row">
                <div className="col-3"></div>
                <div className="col-6">
                    <legend><h2 className="subTitle">Mortgage Details</h2></legend>
                </div>
                <div className="col-3"></div>
            </div>
            
            
            <div className="form-group">
                <label>Down Payment</label>
                <div className="row">
                    <div className="col-5">
                        <input className="form-control" type="number" value={props.downPaymentPercent} onChange={(e) => props.setDownPaymentPercent(e.target.value)}></input> 
                    </div>
                    %
                    OR
                    $
                    <div className="col-5">
                        <input className="form-control" type="number" value={props.downPaymentTotal} onChange={(e) => props.setDownPaymentTotal(e.target.value)}></input>
                    </div>
                </div>
                <p className="text-center">{props.downPaymentWarning ? "Please only enter Percent or Total, not both." : null}</p>
            </div>

            <br></br>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <label>Interest Rate</label>
                        <input className="form-control" type="number" value={props.interestRate} onChange={(e) => props.setInterestRate(e.target.value)}></input>
                        %
                    </div>
                </div>
                <br></br>
                <br></br>
                
                <div className="col-4">
                    <div className="form-group">
                        <label>Homeowner's Insurance</label>
                        <input className="form-control" type="number" value={props.homeInsure} onChange={(e) => props.setHomeInsure(e.target.value)}></input>
                    </div>
                    (monthly)
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label>Property Taxes</label>
                        <input className="form-control" type="number" value={props.propTax} onChange={(e) => props.setPropTax(e.target.value)}></input>
                    </div>
                    %
                </div>
            </div>
            <div className="row">
                
            </div>

            <br></br>
            
            <div className="form-group">
                <label className="radio-title">Loan Term Length (years)</label>
                <div className="form-check form-check-inline">
                    <label className="form-check-label"  htmlFor="ten-year">10</label>
                    <input className="form-check-input" type="radio" name="loan-length" id="tenYear" checked={props.loanLength === 10}
                    onChange={e => props.setLoanLength(10)}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label"  htmlFor="fifteen-year">15</label>
                    <input className="form-check-input" type="radio" name="loan-length" id="fifteenYear" checked={props.loanLength === 15}
                    onChange={e => props.setLoanLength(15)}></input>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label"  htmlFor="thirty-year">30</label>
                    <input className="form-check-input" type="radio" name="loan-length" id="thirtyYear" checked={props.loanLength === 30}
                    onChange={e => props.setLoanLength(30)}></input>
                </div>
            </div>

        </fieldset>
    )
}

export default MortgageDetailsForm;