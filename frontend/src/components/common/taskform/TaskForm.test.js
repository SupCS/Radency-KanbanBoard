import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "./TaskForm";
jest.mock("../../../assets/icons/downArrow.svg", () => ({
    ReactComponent: () => <svg></svg>,
}));

describe("TaskForm", () => {
    test("inputs should be initially empty", () => {
        render(<TaskForm onSave={() => {}} />);
        expect(screen.getByPlaceholderText("Task Name")).toHaveValue("");
        expect(screen.getByPlaceholderText("Task Description")).toHaveValue("");
    });

    test("allows entering a task name", () => {
        render(<TaskForm onSave={() => {}} />);
        fireEvent.change(screen.getByPlaceholderText("Task Name"), {
            target: { value: "Test Task" },
        });
        expect(screen.getByPlaceholderText("Task Name")).toHaveValue(
            "Test Task"
        );
    });

    test("allows entering a task description", () => {
        render(<TaskForm onSave={() => {}} />);
        fireEvent.change(screen.getByPlaceholderText("Task Description"), {
            target: { value: "This is a test description" },
        });
        expect(screen.getByPlaceholderText("Task Description")).toHaveValue(
            "This is a test description"
        );
    });

    test("allows setting a due date", () => {
        render(<TaskForm onSave={() => {}} />);
        fireEvent.change(screen.getByLabelText("Due Date"), {
            target: { value: "2023-01-01" },
        });
        expect(screen.getByLabelText("Due Date")).toHaveValue("2023-01-01");
    });

    test("allows selecting a priority", () => {
        render(<TaskForm onSave={() => {}} />);
        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "high" },
        });
        expect(screen.getByRole("combobox")).toHaveValue("high");
    });

    test("calls onSave with the task data when the form is submitted", () => {
        const onSaveMock = jest.fn();
        render(<TaskForm onSave={onSaveMock} />);
        fireEvent.change(screen.getByPlaceholderText("Task Name"), {
            target: { value: "Test Task" },
        });
        fireEvent.change(screen.getByPlaceholderText("Task Description"), {
            target: { value: "This is a test description" },
        });
        fireEvent.change(screen.getByLabelText("Due Date"), {
            target: { value: "2023-01-01" },
        });
        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "high" },
        });
        fireEvent.click(screen.getByRole("button", { name: /create task/i }));

        expect(onSaveMock).toHaveBeenCalledWith({
            taskName: "Test Task",
            taskDescription: "This is a test description",
            dueDate: "2023-01-01",
            priority: "high",
        });
    });
});
