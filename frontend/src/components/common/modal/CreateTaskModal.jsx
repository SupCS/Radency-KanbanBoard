import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-5 rounded-md relative max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <button
                    className="absolute top-2.5 right-2.5 text-lg border-none bg-none cursor-pointer"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Modal;
