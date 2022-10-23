const Button = (props) => {
    let { children, setOnClick, isOutline = false, color } = props;

    let classlist = "Button-btn Button-btn";
    // classlist =  "Button-btn-orange"];
    if (color == "orange") {
        classlist = classlist + " Button-btn-orange";
    }
    if (isOutline) {
        classlist = classlist + "-outline";
    }
    return (
        <button className={classlist} onClick={setOnClick} > {children}</button>
    )
}

export default Button;