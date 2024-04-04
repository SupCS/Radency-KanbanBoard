import React, { useState, useEffect } from "react";

const ScrollButtons = ({ scrollContainerSelector, itemCount }) => {
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    useEffect(() => {
        const container = document.querySelector(scrollContainerSelector);
        const checkScrollButtons = () => {
            setShowLeftButton(container.scrollLeft > 0);
            setShowRightButton(
                container.scrollLeft <
                    container.scrollWidth - container.clientWidth - 1
            );
        };

        // Перевіряємо при маунті
        checkScrollButtons();

        container.addEventListener("scroll", checkScrollButtons);

        // Перевіряєм кожного разу, коли змінюється кількість елементів
        checkScrollButtons();

        return () =>
            container.removeEventListener("scroll", checkScrollButtons);
    }, [scrollContainerSelector, itemCount]);

    const scroll = (direction) => {
        const container = document.querySelector(scrollContainerSelector);
        const scrollAmount = window.innerWidth * 0.7; // Прокрутка на 70% екрану
        if (container) {
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            {showLeftButton && (
                <button
                    className="fixed top-1/2 -translate-y-1/2 z-10 cursor-pointer text-3xl bg-gray-400 border-none rounded-full w-10 h-10 flex items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 left-2.5"
                    onClick={() => scroll("left")}
                >
                    {"<"}
                </button>
            )}
            {showRightButton && (
                <button
                    className="fixed top-1/2 -translate-y-1/2 z-10 cursor-pointer text-3xl bg-gray-400 border-none rounded-full w-10 h-10 flex items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 right-2.5"
                    onClick={() => scroll("right")}
                >
                    {">"}
                </button>
            )}
        </>
    );
};

export default ScrollButtons;
