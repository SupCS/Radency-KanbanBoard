import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../../redux/tasksSlice";
import listsReducer from "../../redux/listsSlice";
import historyReducer from "../../redux/historySlice";
import ListContainer from "./ListContainer";
import { action } from "@storybook/addon-actions";

const mockStore = configureStore({
    reducer: {
        tasks: tasksReducer,
        lists: listsReducer,
        history: historyReducer,
    },
    preloadedState: {
        lists: {
            items: [
                {
                    id: 1,
                    name: "Empty List",
                    tasks: [],
                },
                {
                    id: 2,
                    name: "List with One Task",
                    tasks: [
                        {
                            id: 1,
                            taskName: "Sample Task 1",
                            taskDescription: "Description for Sample Task 1",
                            dueDate: "2023-04-01",
                            priority: "medium",
                        },
                    ],
                },
                {
                    id: 3,
                    name: "List with Two Tasks",
                    tasks: [
                        {
                            id: 2,
                            taskName: "Sample Task 2",
                            taskDescription: "Description for Sample Task 2",
                            dueDate: "2023-04-02",
                            priority: "high",
                        },
                        {
                            id: 3,
                            taskName: "Sample Task 3",
                            taskDescription: "Description for Sample Task 3",
                            dueDate: "2023-04-03",
                            priority: "low",
                        },
                    ],
                },
            ],
            status: "idle",
            error: null,
        },
    },
});

export default {
    title: "Components/List",
    component: ListContainer,
    decorators: [
        (Story) => (
            <Provider store={mockStore}>
                <Story />
            </Provider>
        ),
    ],
};

const Template = (args) => <ListContainer {...args} />;

const OneTaskListTemplate = Template.bind({});
OneTaskListTemplate.args = {
    id: 2,
    title: "List with One Task",
    tasks: mockStore.getState().lists.items[1].tasks,
    taskLists: [],
    onAddTask: action("Add task triggered"),
    onUpdateTitle: action("Update title triggered"),
    onDeleteList: action("Delete list triggered"),
    onMoveTask: action("Move task triggered"),
    onEditTaskSubmit: action("Edit task triggered"),
    onDeleteTask: action("Delete task triggered"),
};

const EmptyListTemplate = Template.bind({});
EmptyListTemplate.args = {
    ...OneTaskListTemplate.args,
    id: 1,
    title: "Empty List",
    tasks: [],
};

const TwoTasksListTemplate = Template.bind({});
TwoTasksListTemplate.args = {
    ...OneTaskListTemplate.args,
    id: 3,
    title: "List with Two Tasks",
    tasks: mockStore.getState().lists.items[2].tasks,
};

export { EmptyListTemplate, OneTaskListTemplate, TwoTasksListTemplate };
