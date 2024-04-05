import React from "react";
import { ReactComponent as DownArrowIcon } from "../../../assets/icons/downArrow.svg";

const Select = ({ options, className, icon, ...props }) => {
    return (
        <div className={`relative ${className}`}>
            <select
                className="appearance-none p-2 pr-8 bg-no-repeat bg-right-2 bg-center border border-gray-300 rounded-md shadow-sm text-gray-666 cursor-pointer w-full bg-f9f9f9"
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                {icon || <DownArrowIcon className="w-3 h-3 mr-2" />}
            </div>
        </div>
    );
};

export default Select;
