import React from "react";

const Textarea = ({ className, ...props }) => {
    return (
        <textarea
            className={`p-2 border border-gray-300 rounded-md outline-none resize-none ${className}`}
            {...props}
        ></textarea>
    );
};

export default Textarea;
