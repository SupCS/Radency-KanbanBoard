import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import KebabMenu from "./KebabMenu";

jest.mock("../../../assets/icons/kebabIcon.svg", () => "kebabIcon.svg");

describe("KebabMenu component", () => {
    test("displays menu on icon click", () => {
        render(
            <KebabMenu>
                <button>Option 1</button>
            </KebabMenu>
        );
        fireEvent.click(screen.getByRole("button", { name: /menu/i }));
        expect(screen.getByText(/Option 1/i)).toBeVisible();
    });

    test("hides menu when clicking outside", () => {
        const { container } = render(
            <div>
                <KebabMenu>
                    <button>Option 1</button>
                </KebabMenu>
                <div data-testid="outside">Outside Element</div>
            </div>
        );

        fireEvent.click(screen.getByRole("button", { name: /menu/i }));
        expect(screen.getByText(/Option 1/i)).toBeVisible();

        fireEvent.mouseDown(container.querySelector('[data-testid="outside"]'));
        expect(screen.queryByText(/Option 1/i)).not.toBeInTheDocument();
    });
});
