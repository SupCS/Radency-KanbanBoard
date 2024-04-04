import React from "react";
import Button from "../common/Button/Button";
import plusIconLight from "../../assets/icons/plusIconLight.svg";
import plusIcon from "../../assets/icons/plusIcon.svg";
import historyIcon from "../../assets/icons/historyIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import { ReactComponent as DownArrowIcon } from "../../assets/icons/downArrow.svg";

function Header({
    onAddNewBoard,
    isEditingBoard,
    editedBoardName,
    handleEditBoardName,
    handleSaveBoardName,
    onSelectBoard,
    boards,
    currentBoardId,
    onDeleteBoard,
    toggleHistory,
    onAddNewList,
}) {
    return (
        <div className="flex justify-between m-5 mb-0">
            <div className="board-buttons-container">
                <Button icon={plusIcon} onClick={onAddNewBoard}>
                    New Board
                </Button>
                {isEditingBoard ? (
                    <>
                        <input
                            type="text"
                            value={editedBoardName}
                            onChange={(e) =>
                                handleEditBoardName(e.target.value)
                            }
                            onBlur={handleSaveBoardName}
                            autoFocus
                        />
                    </>
                ) : (
                    <>
                        <div className="relative">
                            <select
                                value={currentBoardId || ""}
                                onChange={(e) => onSelectBoard(e.target.value)}
                                className="appearance-none p-2 pr-8 bg-no-repeat bg-right-2 bg-center border border-gray-300 rounded-md shadow-sm text-gray-666 cursor-pointer w-full bg-f9f9f9"
                            >
                                {boards.map((board) => (
                                    <option key={board.id} value={board.id}>
                                        {board.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <DownArrowIcon className="w-3 h-3 mr-2" />
                            </div>
                        </div>
                        <Button
                            icon={editIcon}
                            onClick={() => handleEditBoardName()}
                        ></Button>
                    </>
                )}
                <Button icon={deleteIcon} onClick={onDeleteBoard}></Button>
            </div>
            <div className="list-buttons-container">
                <Button onClick={toggleHistory} icon={historyIcon}>
                    History
                </Button>
                <Button icon={plusIconLight} dark onClick={onAddNewList}>
                    New List
                </Button>
            </div>
        </div>
    );
}

export default Header;
