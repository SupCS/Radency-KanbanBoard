import React, { forwardRef } from "react";
import Button from "../common/Button/Button";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const HistorySidebar = forwardRef(
    ({ sidebarRef, isOpen, onClose, logs, onClearHistory }, ref) => {
        return (
            <aside
                ref={ref}
                className={`fixed top-0 right-0 w-72 h-full bg-white shadow-md transform transition-transform duration-300 z-50 overflow-y-auto ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex gap-2.5 m-2.5">
                    <Button onClick={onClose}>Close</Button>
                    <Button onClick={onClearHistory} icon={deleteIcon}>
                        Clear
                    </Button>
                </div>
                <ul className="list-none p-5">
                    {logs &&
                        logs.map((log) => (
                            <li key={log.id} className="mt-3.5 first:mt-0">
                                <p>{log.description}</p>
                                <small>
                                    {new Date(log.timestamp).toLocaleString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        }
                                    )}
                                </small>
                            </li>
                        ))}
                </ul>
            </aside>
        );
    }
);

export default HistorySidebar;
