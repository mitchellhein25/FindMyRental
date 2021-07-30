import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function RentEstimateForm(props) {

    return (
        <fieldset>
            <div className="row sub-title-row mt-5 mb-0">
                <div className="col-2">
                    <OverlayTrigger
                        key='left'
                        placement='left'
                        overlay={
                            <Tooltip id={`tooltip-'left'`}>
                            All of these numbers are region dependent, and prefilled numbers are just a starting point. Try to estimate 
                            these numbers based on your area or your experience with the real estate in the area you are searching.
                            </Tooltip> 
                        }
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-info-circle p-0 m-0" viewBox="0 0 20 20">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                    </OverlayTrigger>
                </div>
                <div className="col-8">
                    <legend><h4 className="subTitle">Monthly Rent Estimate</h4></legend>
                </div>
                <div className="col-2"></div>
            </div>
            

            <div className="form-group">
                <div className="text-center">
                    <label>Projected Rent</label>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-4">
                        <div className="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="rentDollarPrepend">$</span>
                            </div>
                            <input className="form-control" type="number" aria-describedby="rentDollarPrepend" value={props.state.rentPerRoom} 
                            default={500} onChange={e => props.setState({...props.state, rentPerRoom: e.target.value})}></input>
                            
                        </div>
                        <small className="form-text text-muted">
                            <p id="helpBlock" >Per Room</p>
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
                        <input className="form-control" type="number" value={props.state.totalRent} onChange={e => props.setState({...props.state, totalRent: e.target.value})}></input> 
                        <div>
                            
                        </div>
                        </div>
                        <small className="form-text text-muted">
                            <p id="helpBlock" >Total</p>
                        </small>
                    </div>
                    <div className="col-1"></div>
                </div>
                <p className="text-center">{props.state.rentWarning ? "Please only enter Per Room or Total, not both." : null}</p>
            </div>

        </fieldset>
    )
}

export default RentEstimateForm;