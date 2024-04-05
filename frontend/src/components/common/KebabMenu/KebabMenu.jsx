import React, { useState, useRef, useEffect } from "react";
import kebabIcon from "../../../assets/icons/kebabIcon.svg";

const KebabMenu = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const menuRef = useRef();

    const togglePopup = (event) => {
        event.stopPropagation();
        setIsPopupOpen(!isPopupOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="kebab-menu-container relative self-start w-max"
            ref={menuRef}
        >
            <button
                className="border-none outline-none cursor-pointer bg-inherit"
                onClick={togglePopup}
            >
                <img className="h-7 w-auto" src={kebabIcon} alt="menu" />
            </button>
            {isPopupOpen && (
                <div className="popup-menu absolute left-full top-0 bg-white shadow-md rounded-md p-2 z-50 w-max">
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, {
                            className:
                                "flex items-center gap-1 bg-none border-none p-2 w-full text-left cursor-pointer hover:bg-gray-200 transition-colors duration-300",
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default KebabMenu;
