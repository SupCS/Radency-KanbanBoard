import React from "react";

export default function Button({ children, icon, dark = false, ...props }) {
    const buttonClass = `inline-flex items-center justify-center gap-2.5 px-5 py-2.5 border-none rounded-md cursor-pointer transition-all duration-300 ${
        dark
            ? "bg-custom-gray-800 text-gray-100 hover:bg-custom-gray-900"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`;

    return (
        <button className={buttonClass} {...props}>
            {icon && <img src={icon} className="w-4 h-auto" alt="icon" />}
            {children}
        </button>
    );
}
