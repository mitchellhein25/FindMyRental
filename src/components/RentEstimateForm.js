import InfoToolTipIcon from './InfoToolTipIcon';

function RentEstimateForm(props) {

    const toolTip = 'All of these numbers are region dependent, and prefilled numbers are just a starting point. Try to estimate these numbers based on your area or your experience with the real estate in the area you are searching.';
    const monthlyRentEst = 'Monthly Rent Estimate';
    const projectedRent = 'Projected Rent';
    const perRoom = 'Per Room';
    const total = 'Total';
    const warningMessage = 'Please only enter Per Room or Total, not both.';

    return (
        <fieldset>
            <div className="row sub-title-row mt-5 mb-0">
                <div className="col-2">
                < InfoToolTipIcon height={40} weight={40} side={props.height < 700 || props.width < 1450 ? 'right' : 'left'} text={toolTip} />
                </div>
                <div className="col-8">
                    <legend><h4 className="subTitle">{monthlyRentEst}</h4></legend>
                </div>
                <div className="col-2"></div>
            </div>
            

            <div className="form-group">
                <div className="text-center">
                    <label>{projectedRent}</label>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-4">
                        <div className="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="rentDollarPrepend">$</span>
                            </div>
                            <input className="form-control" type="number" aria-describedby="rentDollarPrepend" value={props.rentPerRoom} 
                            default={500} onChange={(e) => props.setRentPerRoom(e.target.value)}></input>
                            
                        </div>
                        <small className="form-text text-muted">
                            <p id="helpBlock" >{perRoom}</p>
                        </small>
                    </div>
                    <div className="col-2 text-center">
                        <h5 className="text-center">OR</h5>
                    </div>
                    <div className="col-4">
                    <div className="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="rentDollarPrepend">$</span>
                            </div>
                        <input className="form-control" type="number" value={props.totalRent} onChange={(e) => props.setTotalRent(e.target.value)}></input> 
                        <div>
                            
                        </div>
                        </div>
                        <small className="form-text text-muted">
                            <p id="helpBlock" >{total}</p>
                        </small>
                    </div>
                    <div className="col-1"></div>
                </div>
                <p className="text-center">{props.rentWarning ? {warningMessage} : null}</p>
            </div>

        </fieldset>
    )
}

export default RentEstimateForm;