// KebabMenu.stories.jsx
import React from "react";
import Button from "../Button/Button.jsx";
import KebabMenu from "./KebabMenu";
import editIcon from "../../../assets/icons/editIcon.svg";
import deleteIcon from "../../../assets/icons/deleteIcon.svg";
import { action } from "@storybook/addon-actions";

export default {
    title: "Components/KebabMenu",
    component: KebabMenu,
};

const Template = (args) => <KebabMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: (
        <>
            <Button
                className={`flex items-center gap-1 bg-none border-none p-2 w-full text-left cursor-pointer hover:bg-gray-200 transition-colors duration-300`}
                icon={editIcon}
                onClick={action("edit-click")}
            >
                Edit
            </Button>
            <Button
                className={`flex items-center gap-1 bg-none border-none p-2 w-full text-left cursor-pointer hover:bg-gray-200 transition-colors duration-300`}
                icon={deleteIcon}
                onClick={action("delete-click")}
            >
                Delete
            </Button>
        </>
    ),
};
