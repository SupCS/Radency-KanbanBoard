// Input.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

describe("Input component", () => {
    test("renders Input component", () => {
        render(<Input placeholder="Test Input" />);
        const inputElement = screen.getByPlaceholderText("Test Input");
        expect(inputElement).toBeInTheDocument();
    });

    test("changes value when typed into", () => {
        render(<Input />);
        const inputElement = screen.getByRole("textbox");
        fireEvent.change(inputElement, { target: { value: "Hello" } });
        expect(inputElement.value).toBe("Hello");
    });
    test("Input component should be disabled when disabled prop is true", () => {
        render(<Input disabled />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeDisabled();
    });
    test("calls onBlur prop when blured", () => {
        const onBlurMock = jest.fn();
        render(<Input onBlur={onBlurMock} />);
        const inputElement = screen.getByRole("textbox");
        fireEvent.blur(inputElement);
        expect(onBlurMock).toHaveBeenCalled();
    });
});
