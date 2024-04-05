// Inputs/Inputs.stories.jsx
import React from "react";
import Input from "./Input.jsx";
import Textarea from "./Textarea.jsx";
import Select from "./Select.jsx";

export default {
    title: "Components/Inputs",
};

export const AllInputs = () => {
    const selectOptions = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    return (
        <div className="flex flex-col gap-5">
            <Input placeholder="Standard input" />
            <Textarea placeholder="Textarea input" />
            <Select options={selectOptions} defaultValue="" />
        </div>
    );
};
