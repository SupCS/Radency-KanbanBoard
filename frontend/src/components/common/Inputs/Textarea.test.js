import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Textarea from "./Textarea";

describe("Textarea component", () => {
    test("renders Textarea component", () => {
        render(<Textarea placeholder="Test Textarea" />);
        const textareaElement = screen.getByPlaceholderText("Test Textarea");
        expect(textareaElement).toBeInTheDocument();
    });

    test("changes value when typed into", () => {
        render(<Textarea />);
        const textareaElement = screen.getByRole("textbox");
        fireEvent.change(textareaElement, { target: { value: "Hello" } });
        expect(textareaElement.value).toBe("Hello");
    });
    test("Textarea component should be disabled when disabled prop is true", () => {
        render(<Textarea disabled />);
        const textareaElement = screen.getByRole("textbox");
        expect(textareaElement).toBeDisabled();
    });
    test("calls onBlur prop when blured", () => {
        const onBlurMock = jest.fn();
        render(<Textarea onBlur={onBlurMock} />);
        const textareaElement = screen.getByRole("textbox");
        fireEvent.blur(textareaElement);
        expect(onBlurMock).toHaveBeenCalled();
    });
});
