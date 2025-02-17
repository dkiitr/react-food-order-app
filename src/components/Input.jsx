import React from "react";

const Input = ({ label, id, ...props }) => {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input type="text" name={id} id={id} {...props} required/>
        </p>
    );
};

export default Input;
