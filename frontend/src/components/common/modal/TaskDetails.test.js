import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskDetailsModal from "./TaskDetailsModal";

jest.mock("../../../assets/icons/kebabIcon.svg", () => () => "KebabIconMock");
jest.mock("../../../assets/icons/downArrow.svg", () => ({
    ReactComponent: () => <svg></svg>,
}));

describe("TaskDetailsModal", () => {
    const task = {
        taskName: "Test Task",
        dueDate: "2023-01-01",
        priority: "High",
        taskDescription: "Test Description",
    };
    const historyLogs = [
        {
            id: 1,
            description: "Task created",
            timestamp: new Date().toISOString(),
        },
    ];

    test("modal should not be visible when isOpen is false", () => {
        render(
            <TaskDetailsModal
                isOpen={false}
                task={task}
                historyLogs={historyLogs}
            />
        );
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    });

    test("modal should display task details correctly", () => {
        render(
            <TaskDetailsModal
                isOpen={true}
                task={task}
                historyLogs={historyLogs}
            />
        );
        expect(screen.getByText(task.taskName)).toBeInTheDocument();
        expect(screen.getByText(task.taskDescription)).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();
        expect(screen.getByText("Task created")).toBeInTheDocument();
    });

    test("clicking close button should call onClose", () => {
        const onClose = jest.fn();
        render(
            <TaskDetailsModal
                isOpen={true}
                onClose={onClose}
                task={task}
                historyLogs={historyLogs}
            />
        );
        fireEvent.click(screen.getByText("✕"));
        expect(onClose).toHaveBeenCalled();
    });

    const initialTask = {
        taskName: "Initial Task",
        dueDate: "2023-01-01",
        priority: "Medium",
        taskDescription: "Initial Description",
    };

    const editedTask = {
        taskName: "Edited Task",
        dueDate: "2023-02-02",
        priority: "High",
        taskDescription: "Edited Description",
    };

    test("displays input fields with initial values when in editing mode", async () => {
        render(
            <TaskDetailsModal
                isOpen={true}
                task={initialTask}
                isEditing={true}
                editedTask={initialTask}
                historyLogs={historyLogs}
                onToggleEdit={() => {}}
                onChange={() => {}}
                onSave={() => {}}
                onClose={() => {}}
            />
        );

        expect(screen.getByText(/Save/i)).toBeInTheDocument();

        expect(
            screen.getByDisplayValue(initialTask.taskName)
        ).toBeInTheDocument();
        expect(
            screen.getByDisplayValue(initialTask.taskDescription)
        ).toBeInTheDocument();
    });
});
