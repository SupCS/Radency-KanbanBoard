import React, { useState } from "react";
import plusIconLight from "../../../assets/icons/plusIconLight.svg";
import Button from "../Button/Button";
import { ReactComponent as DownArrowIcon } from "../../../assets/icons/downArrow.svg";

const TaskForm = ({ onSave }) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ taskName, taskDescription, dueDate, priority });
        // Чистка форми
        setTaskName("");
        setTaskDescription("");
        setDueDate("");
        setPriority("");
    };

    return (
        <form className="flex flex-col p-2.5 gap-3.5" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                className="p-2 border border-gray-300 rounded-md outline-none"
                onChange={(e) => setTaskName(e.target.value)}
            />
            <textarea
                placeholder="Task Description"
                value={taskDescription}
                className="p-2 border border-gray-300 rounded-md outline-none"
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                className="p-2 border border-gray-300 rounded-md outline-none"
                onChange={(e) => setDueDate(e.target.value)}
            />
            <div className="relative">
                <select
                    value={priority}
                    className="appearance-none p-2 pr-8 bg-no-repeat bg-right-2 bg-center border border-gray-300 rounded-md bg-f9f9f9 shadow-sm text-gray-666 cursor-pointer w-full"
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <DownArrowIcon className="w-3 h-3 mr-2" />
                </div>
            </div>
            <Button icon={plusIconLight} dark>
                Create Task
            </Button>
        </form>
    );
};

export default TaskForm;
