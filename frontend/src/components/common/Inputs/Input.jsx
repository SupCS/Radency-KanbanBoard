import React from "react";

const Input = ({ className, ...props }) => {
    return (
        <input
            className={`p-2 border border-gray-300 rounded-md outline-none ${className}`}
            {...props}
        />
    );
};

export default Input;
