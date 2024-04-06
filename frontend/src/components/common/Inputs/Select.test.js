import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "./Select.jsx";
jest.mock("../../../assets/icons/downArrow.svg", () => ({
    ReactComponent: () => <svg></svg>,
}));

describe("Select component", () => {
    const options = [
        { value: "", label: "Select Priority" },
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
    ];

    test("renders Select component and displays options", () => {
        render(<Select options={options} />);
        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toBeInTheDocument();
        options.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    test("changes selected value", () => {
        render(<Select options={options} />);
        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, { target: { value: "medium" } });
        expect(selectElement.value).toBe("medium");
    });

    test("calls onChange prop when changed", () => {
        const onChangeMock = jest.fn();
        render(<Select options={options} onChange={onChangeMock} />);
        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, { target: { value: "high" } });
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    value: "high",
                }),
            })
        );
    });
});
