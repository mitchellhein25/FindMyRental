
export default function ResetAllFieldsButton(props) {

    const clearForm = () => {

        props.setState({
            ...props.state,
            zip: "",
            propType: "",
            priceMin: "",
            priceMax: "",
            beds: "",
            baths: "",
            zip: "",
        });
        
    }

    return (
        <div className="col-3 d-flex justify-content-center">
            <button type="button" onClick={() => clearForm()} className="btn btn-dark btn-lg">Reset all fields</button>
        </div>
    )
}