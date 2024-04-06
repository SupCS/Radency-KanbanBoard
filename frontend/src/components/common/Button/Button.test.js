import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";
import plusIcon from "../../../assets/icons/plusIcon.svg";

describe("Button component", () => {
    test("renders button with children", () => {
        render(<Button>New Board</Button>);
        const buttonElement = screen.getByText(/new board/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test("renders button with icon", () => {
        render(<Button icon={plusIcon}>New Board</Button>);
        const buttonElement = screen.getByText(/new board/i);
        const icon = screen.getByRole("img");
        expect(buttonElement).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });

    test("applies dark theme styles when dark prop is true", () => {
        render(<Button dark>New Board</Button>);
        const buttonElement = screen.getByText(/new board/i);
        expect(buttonElement).toHaveClass("bg-custom-gray-800");
        expect(buttonElement).toHaveClass("text-gray-100");
        expect(buttonElement).toHaveClass("hover:bg-custom-gray-900");
    });

    test("applies light theme styles by default", () => {
        render(<Button>New Board</Button>);
        const buttonElement = screen.getByText(/new board/i);
        expect(buttonElement).toHaveClass("bg-gray-200");
        expect(buttonElement).toHaveClass("text-gray-800");
        expect(buttonElement).toHaveClass("hover:bg-gray-300");
    });
});
