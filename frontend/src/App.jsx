import React from "react";
import HistorySidebarContainer from "./components/History/HistorySidebarContainer";
import ScrollButtons from "./components/ScrollButtons/ScrollButtons";
import ListContainer from "./components/List/ListContainer";
import "./App.css";
import Header from "./components/Header/Header";

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
            <Header
                onAddNewBoard={onAddNewBoard}
                isEditingBoard={isEditingBoard}
                editedBoardName={editedBoardName}
                handleEditBoardName={handleEditBoardName}
                handleSaveBoardName={handleSaveBoardName}
                onSelectBoard={onSelectBoard}
                boards={boards}
                currentBoardId={currentBoardId}
                onDeleteBoard={onDeleteBoard}
                toggleHistory={toggleHistory}
                onAddNewList={onAddNewList}
            />
            <HistorySidebarContainer
                isOpen={isHistoryOpen}
                onClose={toggleHistory}
                currentBoardId={currentBoardId}
            />
            <div className="columns-wrapper flex overflow-x-auto scrollbar-hide gap-4">
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
            <ScrollButtons
                scrollContainerSelector=".columns-wrapper"
                itemCount={taskLists.length}
            />
        </div>
    );
}

export default App;
