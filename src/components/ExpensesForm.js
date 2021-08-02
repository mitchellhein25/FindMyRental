import InfoToolTipIcon from './InfoToolTipIcon';

function ExpensesForm(props) {

    const title = 'Monthly Expenses';
    const utilities = 'Utilities';
    const vacancy = 'Vacancy';
    const vacancyToolTip = 'Percentage of time the property will be vacant (not rented).';
    const capEx = 'CapEx';
    const capExToolTip = 'Expenses that extend the life of a rental property. This is similar to Repairs and Maintenance, but more focused towards saving for larger structural fixes. Examples: Roof, HVAC, paint, etc.';
    const repMaint = 'Repairs/Maintenance';
    const other = 'Other';
    const otherToopTip = 'Any other expenses. Examples: HOA fees, property management, etc.';

    return (
        <fieldset>
            <div className="row sub-title-row">
                <div className="col-2"></div>
                <div className="col-8">
                    <legend><h4 className="subTitle">{title}</h4></legend>
                </div>
                <div className="col-2"></div>
            </div>
            
            <div className="row mb-0">
                
                <div className="col-2"></div>
                <div className="col-4">
                    <div className="text-center">
                        <label>{utilities}</label>
                    </div>
                    <div className="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="utilitiesPrepend">$</span>
                        </div>
                            <input className="form-control" type="number" aria-describedby="utilitiesPrepend"
                            value={props.state.utilities} onChange={e => props.setState({...props.state, utilities: e.target.value})}></input>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="text-center">
                            <label>{vacancy}&nbsp;  </label>
                            < InfoToolTipIcon height={20} weight={20} side={'top'} text={vacancyToolTip} />
                        </div>
                        <div className="input-group">
                            <input className="form-control" type="number"  aria-describedby="vacancyAppend" 
                            value={props.state.vacancy} onChange={e => props.setState({...props.state, vacancy: e.target.value})}></input>
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
                        <label>{capEx}&nbsp;</label>
                        < InfoToolTipIcon height={20} weight={20} side={'top'} text={capExToolTip} />
                    </div>
                    <div className="input-group">
                        <input className="form-control" type="number" aria-describedby="capExAppend" 
                        value={props.state.capEx} onChange={e => props.setState({...props.state, capEx: e.target.value})}></input>
                        <div class="input-group-append">
                            <span class="input-group-text" id="capExAppend">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="text-center">
                        <label style={{fontSize: "1em"}}>{repMaint}</label>
                    </div>
                    <div className="input-group">
                        <input className="form-control" type="number" aria-describedby="repMaintAppend" value={props.state.repairMaint} 
                        onChange={e => props.setState({...props.state, repairMaint: e.target.value})}></input>
                        <div class="input-group-append">
                            <span class="input-group-text" id="repMaintAppend">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="text-center">
                        <label>{other}&nbsp;</label>
                        < InfoToolTipIcon height={20} weight={20} side={'top'} text={otherToopTip} />
                    </div>
                    <div className="input-group">
                        <input className="form-control" type="number" value={props.state.other} onChange={e => props.setState({...props.state, other: e.target.value})}></input>
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