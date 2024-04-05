// Button.stories.jsx
import React from "react";
import Button from "./Button";
import plusIcon from "../../../assets/icons/plusIcon.svg";
import plusIconLight from "../../../assets/icons/plusIconLight.svg";
import { action } from "@storybook/addon-actions";

export default {
    title: "Components/Button",
    component: Button,
    argTypes: {
        dark: {
            control: "boolean",
            description: "Toggle dark mode",
            defaultValue: false,
        },
        icon: {
            control: "select",
            options: [null, "plusIcon", "plusIconLight"],
            mapping: {
                null: null,
                plusIcon: plusIcon,
                plusIconLight: plusIconLight,
            },
            description: "Select an icon",
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",
                }}
            >
                <Story />
            </div>
        ),
    ],
};

const Template = (args) => (
    <Button onClick={action("button-click")} {...args} />
);

export const ButtonWithControls = Template.bind({});
ButtonWithControls.args = {
    children: "Button",
    dark: false,
    icon: null,
};
