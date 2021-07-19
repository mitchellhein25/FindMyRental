
function RentEstimateForm(props) {

    return (
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
                        <input className="form-control" type="number" value={props.rentPerRoom} default={500} onChange={(e) => props.setRentPerRoom(e.target.value)}></input>
                        <div>
                            <small className="form-text text-muted">
                                <p id="helpBlock" >Per Room</p>
                            </small>
                        </div>
                    </div>
                    OR
                    $
                    <div className="col-5">
                        <input className="form-control" type="number" value={props.totalRent} onChange={(e) => props.setTotalRent(e.target.value)}></input> 
                        <div>
                            <small className="form-text text-muted">
                                <p id="helpBlock" >Total</p>
                            </small>
                        </div>
                    </div>
                </div>
                <p className="text-center">{props.rentWarning ? "Please only enter Per Room or Total, not both." : null}</p>
            </div>

        </fieldset>
    )
}

export default RentEstimateForm;