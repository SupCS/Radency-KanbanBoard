import React from "react";
import Button from "../common/Button/Button";
import plusIconLight from "../../assets/icons/plusIconLight.svg";
import plusIcon from "../../assets/icons/plusIcon.svg";
import historyIcon from "../../assets/icons/historyIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import Input from "../common/Inputs/Input";
import Select from "../common/Inputs/Select";

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
            <div className="board-buttons-container mr-5">
                <Button icon={plusIcon} onClick={onAddNewBoard}>
                    New Board
                </Button>
                {isEditingBoard ? (
                    <>
                        <Input
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
                        <Select
                            value={currentBoardId || ""}
                            onChange={(e) => onSelectBoard(e.target.value)}
                            options={boards.map((board) => ({
                                value: board.id,
                                label: board.name,
                            }))}
                        />
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
