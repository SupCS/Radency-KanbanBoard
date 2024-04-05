import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../../redux/tasksSlice";
import historyReducer from "../../redux/historySlice";
import Task from "./Task";
import { action } from "@storybook/addon-actions";

export default {
    title: "Components/Task",
    component: Task,
    decorators: [
        (Story) => (
            <Provider store={mockStore}>
                <Story />
            </Provider>
        ),
    ],
    argTypes: {
        priority: {
            control: "select",
            options: ["low", "medium", "high"],
        },
    },
};

const mockStore = configureStore({
    reducer: {
        tasks: taskReducer,
        history: historyReducer,
    },
    preloadedState: {
        history: {
            logs: [],
            status: "idle",
            error: null,
        },
    },
});

const Template = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
    taskId: 1,
    truncatedTaskName: "Sample Task",
    truncatedTaskDescription: "This is a sample task description.",
    dueDate: "2023-04-01",
    priority: "medium",
    taskLists: [
        { id: 1, name: "To Do" },
        { id: 2, name: "Done" },
        { id: 3, name: "In progress" },
    ],
    onMoveTask: action("Move task triggered"),
    onOpenModal: action("Edit task triggered"),
    onDeleteTask: action("Delete task triggered"),
};
