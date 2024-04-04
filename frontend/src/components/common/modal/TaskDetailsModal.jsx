import React from "react";
import "./TaskDetailsModal.css";
import Button from "../Button/Button";
import editIcon from "../../../assets/icons/editIcon.svg";

const TaskDetailsModal = ({
    isOpen,
    onClose,
    task,
    isEditing,
    editedTask,
    onToggleEdit,
    onChange,
    onSave,
    historyLogs,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 cursor-auto"
            onClick={onClose}
        >
            <div
                className="details-modal-content bg-white p-5 rounded-md relative w-4/5 h-4/5 shadow-md flex flex-col overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="task-details flex p-5 h-full">
                    <div className="task-info flex flex-col gap-2.5 flex-auto pr-3.5 w-full lg:w-3/5">
                        <div className="flex gap-5 items-center">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="taskName"
                                        value={editedTask.taskName}
                                        onChange={onChange}
                                        autoFocus
                                        className="input border border-gray-300 p-2 rounded-md w-full"
                                    />
                                    <Button onClick={onSave}>Save</Button>
                                </>
                            ) : (
                                <>
                                    <h2>{task.taskName}</h2>
                                    <Button
                                        icon={editIcon}
                                        onClick={onToggleEdit}
                                    >
                                        Edit
                                    </Button>
                                </>
                            )}
                        </div>
                        {isEditing ? (
                            <>
                                <div className="flex items-center gap-2.5 mb-2.5">
                                    <label
                                        htmlFor="dueDate"
                                        className="flex-none w-1/3 font-bold"
                                    >
                                        Due date:
                                    </label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={editedTask.dueDate}
                                        onChange={onChange}
                                        className="border border-gray-300 p-2 rounded-md flex-grow"
                                    />
                                </div>
                                <div className="flex items-center gap-2.5 mb-2.5">
                                    <label
                                        htmlFor="priority"
                                        className="flex-none w-1/3 font-bold"
                                    >
                                        Priority:
                                    </label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={editedTask.priority}
                                        onChange={onChange}
                                        className="border border-gray-300 p-2 rounded-md flex-grow"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div className="flex items-start gap-2.5 mb-2.5">
                                    <label
                                        htmlFor="taskDescription"
                                        className="flex-none w-1/3 font-bold align-top pt-2"
                                    >
                                        Description:
                                    </label>
                                    <textarea
                                        id="taskDescription"
                                        name="taskDescription"
                                        value={editedTask.taskDescription}
                                        onChange={onChange}
                                        className="border border-gray-300 p-2 rounded-md flex-grow h-24"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="task-info-row flex items-center mb-2.5">
                                    <div className="task-label flex-none w-1/3">
                                        Due date:
                                    </div>
                                    <div className="task-value flex-grow">
                                        {task.dueDate}
                                    </div>
                                </div>
                                <div className="task-info-row flex items-center mb-2.5">
                                    <div className="task-label flex-none w-1/3">
                                        Priority:
                                    </div>
                                    <div className="task-value flex-grow">
                                        {task.priority}
                                    </div>
                                </div>
                                <h3>Description</h3>
                                <p className="text-gray-600">
                                    {task.taskDescription}
                                </p>
                            </>
                        )}
                    </div>

                    <div className="history-section flex-auto w-full lg:w-2/5 bg-gray-100 p-3.5 overflow-y-auto">
                        <h3>History</h3>
                        <ul className="list-none p-0">
                            {historyLogs.map((log) => (
                                <li
                                    key={log.id}
                                    className="mb-2.5 text-gray-600"
                                >
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
                    </div>
                </div>
                <button
                    className="absolute top-2.5 right-2.5 border-none bg-none cursor-pointer text-2xl"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default TaskDetailsModal;
