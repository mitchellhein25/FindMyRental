import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ExpensesForm(props) {

    return (
        <fieldset>
            <div className="row sub-title-row">
                <div className="col-2"></div>
                <div className="col-8">
                    <legend><h4 className="subTitle">Monthly Expenses</h4></legend>
                </div>
                <div className="col-2"></div>
            </div>
            
            <div className="row mb-0">
                
                <div className="col-2"></div>
                <div className="col-4">
                    <div className="text-center">
                        <label>Utilities</label>
                    </div>
                    <div className="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="utilitiesPrepend">$</span>
                        </div>
                            <input className="form-control" type="number" aria-describedby="utilitiesPrepend"
                            value={props.utilities} onChange={(e) => props.setUtilities(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="text-center">
                            <label>Vacancy&nbsp;  </label>
                            <OverlayTrigger
                                key='top'
                                placement='top'
                                overlay={
                                    <Tooltip id={`tooltip-'top'`}>
                                    Percentage of time the property will be vacant (not rented).
                                    </Tooltip> 
                                }
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle p-0 m-0" viewBox="0 0 20 20">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </OverlayTrigger>
                        </div>
                        <div className="input-group">
                            <input className="form-control" type="number"  aria-aria-describedby="vacancyAppend" 
                            value={props.vacancy} onChange={(e) => props.setVacancy(e.target.value)}></input>
                            <div class="input-group-append">
                                <span class="input-group-text" id="vacancyAppend">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
            </div>

            <br></br>
            
            <div className="row m-1 pb-4">
                <div className="col-4">
                    <div className="text-center">
                        <label>CapEx&nbsp;</label>
                        <OverlayTrigger
                                key='top'
                                placement='top'
                                overlay={
                                    <Tooltip id={`tooltip-'top'`}>
                                    Expenses that extend the life of a rental property. This is similar to Repairs and Maintenance,
                                    but more focused towards saving for larger structural fixes. Examples: Roof, HVAC, paint, etc.
                                    </Tooltip> 
                                }
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle p-0 m-0" viewBox="0 0 20 20">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </OverlayTrigger>
                    </div>
                    <div className="input-group">
                        <input className="form-control" type="number" aria-describedby="capExAppend" 
                        value={props.capEx} onChange={(e) => props.setCapEx(e.target.value)}></input>
                        <div class="input-group-append">
                            <span class="input-group-text" id="capExAppend">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="text-center">
                        <label style={{fontSize: "1em"}}>Repairs/Maintenance</label>
                    </div>
                    <div className="input-group">
                        <input className="form-control" type="number" aria-describedby="repMaintAppend" value={props.repairMaint} onChange={(e) => props.setRepairMaint(e.target.value)}></input>
                        <div class="input-group-append">
                            <span class="input-group-text" id="repMaintAppend">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="text-center">
                        <label>Other&nbsp;</label>
                        <OverlayTrigger
                                key='top'
                                placement='top'
                                overlay={
                                    <Tooltip id={`tooltip-'top'`}>
                                    Any other expenses. Examples: HOA fees, property management, etc.
                                    </Tooltip> 
                                }
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle p-0 m-0" viewBox="0 0 20 20">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </OverlayTrigger>
                    </div>
                    <div className="input-group">
                        <input className="form-control" type="number" value={props.other} onChange={(e) => props.setOther(e.target.value)}></input>
                        <div class="input-group-append">
                            <span class="input-group-text" id="repMaintAppend">%</span>
                        </div>
                    </div>
                </div>
                
            </div>


        </fieldset>
    )
}

export default ExpensesForm;