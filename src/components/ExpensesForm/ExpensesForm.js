
function ExpensesForm(props) {

    return (
        <fieldset>
            <div className="row sub-title-row">
                <div className="col-3"></div>
                <div className="col-6">
                    <legend><h2 className="subTitle">Expenses</h2></legend>
                </div>
                <div className="col-3"></div>
            </div>
            
            <div className="row">
                <div className="col-3"></div>
                <div className="col-5">
                    <label>Utilities (estimated)</label>
                </div>
                <div className="col-3"></div>
            </div>
            <div className="row">
                <div className="col-3"></div>
                $
                <div className="col-5">
                    <input className="form-control" type="number" 
                    value={props.utilities} onChange={(e) => props.setUtilities(e.target.value)}></input>
                </div>
                <div className="col-3"></div>
            </div>

            <br></br>
            
            <div className="row">
                <div className="col-5">
                    <label>Vacancy</label>
                    <input className="form-control" type="number"  value={props.vacancy} onChange={(e) => props.setVacancy(e.target.value)}></input>
                </div>
                <br></br>
                %
                <div className="col-5">
                    <label>Capital Expenditures</label>
                    <input className="form-control" type="number" value={props.capEx} onChange={(e) => props.setCapEx(e.target.value)}></input>
                </div>
                <br></br>
                %
            </div>

            <br></br>
            
            
            <div className="row">
                <div className="col-5">
                    <label>Repairs and Maintenance</label>
                    <input className="form-control" type="number" value={props.repairMaint} onChange={(e) => props.setRepairMaint(e.target.value)}></input>
                </div>
                <br></br>
                %
                <div className="col-5">
                    <label>Other (PM, HOA, etc.)</label>
                    <input className="form-control" type="number" value={props.other} onChange={(e) => props.setOther(e.target.value)}></input>
                </div>
                <br></br>
                %
            </div>

        </fieldset>
    )
}

export default ExpensesForm;