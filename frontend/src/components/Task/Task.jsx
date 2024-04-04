import React from "react";
import calendarIcon from "../../assets/icons/calendarIcon.svg";
import DetailsModalContainer from "../common/modal/DetailsModalContainer";
import KebabMenu from "../common/KebabMenu/KebabMenu.jsx";
import Button from "../common/Button/Button.jsx";
import editIcon from "../../assets/icons/editIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { formatDate, priorityText } from "../../utils/tasksUtils.js";
import { ReactComponent as DownArrowIcon } from "../../assets/icons/downArrow.svg";

const Task = ({
    taskId,
    taskName,
    taskDescription,
    dueDate,
    priority,
    taskLists,
    onMoveTask,
    onEditTaskSubmit,
    onDeleteTask,
    isModalOpen,
    onOpenModal,
    onCloseModal,
    truncatedTaskName,
    truncatedTaskDescription,
}) => {
    return (
        <div
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-md w-full max-w-xs flex flex-col cursor-pointer"
            onClick={onOpenModal}
        >
            <div className="flex justify-between mb-1.5">
                <h3>{truncatedTaskName}</h3>
                <KebabMenu>
                    <Button
                        icon={editIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenModal();
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        icon={deleteIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTask(taskId);
                        }}
                    >
                        Delete
                    </Button>
                </KebabMenu>
            </div>
            <p className="text-sm text-gray-600 mb-3.5">
                {truncatedTaskDescription}
            </p>
            <div className="flex items-center gap-2.5 text-sm text-gray-600 mb-2.5">
                <img
                    src={calendarIcon}
                    className="w-5 h-5"
                    alt="calendar icon"
                />
                <span>{formatDate(dueDate)}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-200 px-2.5 py-1.5 rounded-full w-fit">
                <span
                    className={`w-2.5 h-2.5 rounded-full ${
                        priority === "low"
                            ? "bg-green-600"
                            : priority === "medium"
                            ? "bg-orange-400"
                            : "bg-red-600"
                    }`}
                ></span>
                <span className="text-sm font-medium">
                    {priorityText(priority)}
                </span>
            </div>
            <div className="relative mt-2.5">
                <select
                    onChange={(e) => onMoveTask(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    defaultValue=""
                    className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 shadow text-base leading-6 text-gray-700 focus:outline-none focus:border-gray-500 focus:shadow-outline transition duration-150 ease-in-out"
                >
                    <option value="" disabled>
                        Move to:
                    </option>
                    {taskLists.map((list) => (
                        <option key={list.id} value={list.id}>
                            {list.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <DownArrowIcon className="w-4 h-4" />
                </div>
            </div>
            <DetailsModalContainer
                isOpen={isModalOpen}
                onClose={onCloseModal}
                task={{ taskId, taskName, taskDescription, dueDate, priority }}
                onEditTaskSubmit={(updatedTask) =>
                    onEditTaskSubmit({ ...updatedTask, taskId })
                }
            />
        </div>
    );
};

export default Task;
