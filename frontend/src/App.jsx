import React from "react";
import plusIconLight from "./assets/icons/plusIconLight.svg";
import plusIcon from "./assets/icons/plusIcon.svg";
import historyIcon from "./assets/icons/historyIcon.svg";
import Button from "./components/common/Button/Button";
import HistorySidebarContainer from "./components/History/HistorySidebarContainer";
import ScrollButtons from "./components/ScrollButtons/ScrollButtons";
import ListContainer from "./components/List/ListContainer";
import "./App.css";
import deleteIcon from "./assets/icons/deleteIcon.svg";
import editIcon from "./assets/icons/editIcon.svg";

function App({
    taskLists,
    boards,
    currentBoardId,
    onSelectBoard,
    onAddNewBoard,
    isHistoryOpen,
    toggleHistory,
    isEditingBoard,
    editedBoardName,
    handleEditBoardName,
    handleSaveBoardName,
    onDeleteBoard,
    status,
    error,
    onAddNewList,
    onUpdateTitle,
    onDeleteList,
    onAddTask,
    onDeleteTask,
    onUpdateTask,
    onMoveTask,
}) {
    return (
        <div className="App">
            <div className="container">
                <div className="app-buttons-container">
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
                                <select
                                    value={currentBoardId || ""}
                                    onChange={(e) =>
                                        onSelectBoard(e.target.value)
                                    }
                                    style={{ marginRight: "10px" }}
                                >
                                    {boards.map((board) => (
                                        <option key={board.id} value={board.id}>
                                            {board.name}
                                        </option>
                                    ))}
                                </select>
                                <Button
                                    icon={editIcon}
                                    onClick={() => handleEditBoardName()}
                                ></Button>
                            </>
                        )}
                        <Button
                            icon={deleteIcon}
                            onClick={onDeleteBoard}
                        ></Button>
                    </div>
                    <div className="list-buttons-container">
                        <Button onClick={toggleHistory} icon={historyIcon}>
                            History
                        </Button>
                        <Button
                            icon={plusIconLight}
                            dark
                            onClick={onAddNewList}
                        >
                            New List
                        </Button>
                    </div>
                </div>
                <HistorySidebarContainer
                    isOpen={isHistoryOpen}
                    onClose={toggleHistory}
                    currentBoardId={currentBoardId}
                />
                <div className="columns-wrapper">
                    {taskLists.map((list) => (
                        <ListContainer
                            key={list.id}
                            id={list.id}
                            title={list.name}
                            tasks={list.tasks || []}
                            onUpdateTitle={onUpdateTitle}
                            onDeleteList={onDeleteList}
                            onAddTask={onAddTask}
                            onMoveTask={onMoveTask}
                            onEditTaskSubmit={onUpdateTask}
                            onDeleteTask={onDeleteTask}
                            taskLists={taskLists}
                        />
                    ))}
                </div>
            </div>
            <ScrollButtons
                scrollContainerSelector=".columns-wrapper"
                itemCount={taskLists.length}
            />
        </div>
    );
}

export default App;
