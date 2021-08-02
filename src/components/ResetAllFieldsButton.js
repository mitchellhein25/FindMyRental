
export default function ResetAllFieldsButton(props) {

    function clearForm () {

        props.setState({
            ...props.state,
            zip: "",
            propType: "",
            priceMin: "",
            priceMax: "",
            beds: "",
            baths: "",
            zip: "",
            interestRate: "",
            homeInsure: "",
            propTax: "",
            loanLength: "",
            utilities: "",
            vacancy: "",
            repairMaint: "",
            capEx: "",
            other: ""
        })

        //Rent Estimate
        props.setMonthlyRent("");
        props.setRentPerRoom("");
        props.setTotalRent("");
        props.setRoomOrTotal("");
        props.setRentWarning(false);

        //Mortgage Details
        props.setDownPaymentPercent("");
        props.setDownPaymentTotal("");
        props.setTotalDownPayment("");
        props.setPercentOrTotal("");
        props.setDownPaymentWarning("");
    }

    return (
        <div className="col-3 d-flex justify-content-center">
            <div type="button" onClick={clearForm} className="btn btn-dark btn-lg">Reset all fields</div>
        </div>
    )
}