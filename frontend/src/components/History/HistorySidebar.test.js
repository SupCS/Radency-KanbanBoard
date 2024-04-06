import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HistorySidebar from "./HistorySidebar";
import Button from "../common/Button/Button";

describe("HistorySidebar component", () => {
    const logs = [
        {
            id: 1,
            description: "Log 1",
            timestamp: new Date("2023-01-01T12:00:00Z"),
        },
        {
            id: 2,
            description: "Log 2",
            timestamp: new Date("2023-01-02T12:00:00Z"),
        },
    ];

    it("renders correctly when closed", () => {
        const { container } = render(
            <HistorySidebar isOpen={false} logs={logs} />
        );
        expect(container.firstChild).toHaveClass("translate-x-full");
    });

    it("renders correctly when open", () => {
        const { container } = render(
            <HistorySidebar isOpen={true} logs={logs} />
        );
        expect(container.firstChild).not.toHaveClass("translate-x-full");
    });

    it("displays logs when open and logs are present", () => {
        render(<HistorySidebar isOpen={true} logs={logs} />);
        expect(screen.getByText("Log 1")).toBeInTheDocument();
        expect(screen.getByText("Log 2")).toBeInTheDocument();
    });

    it('displays "Empty for now" when there are no logs', () => {
        render(<HistorySidebar isOpen={true} logs={[]} />);
        expect(screen.getByText("Empty for now")).toBeInTheDocument();
    });

    it("calls onClose when the Close button is clicked", () => {
        const onCloseMock = jest.fn();
        render(
            <HistorySidebar isOpen={true} logs={logs} onClose={onCloseMock} />
        );
        fireEvent.click(screen.getByText("Close"));
        expect(onCloseMock).toHaveBeenCalled();
    });

    it("calls onClearHistory when the Clear button is clicked", () => {
        const onClearHistoryMock = jest.fn();
        render(
            <HistorySidebar
                isOpen={true}
                logs={logs}
                onClearHistory={onClearHistoryMock}
            />
        );
        fireEvent.click(screen.getByText("Clear"));
        expect(onClearHistoryMock).toHaveBeenCalled();
    });
});
