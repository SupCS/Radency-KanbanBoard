import React, { useState } from "react";
import plusIconLight from "../../../assets/icons/plusIconLight.svg";
import Button from "../Button/Button";
import Input from "../Inputs/Input";
import Textarea from "../Inputs/Textarea";
import Select from "../Inputs/Select";

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
            <Input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <Textarea
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <Input
                aria-label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                options={[
                    { value: "", label: "Select Priority" },
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" },
                ]}
            />
            <Button icon={plusIconLight} dark>
                Create Task
            </Button>
        </form>
    );
};

export default TaskForm;
