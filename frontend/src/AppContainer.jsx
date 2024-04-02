import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";
import {
    fetchLists,
    addNewList,
    deleteList,
    updateListName,
} from "./redux/listsSlice";
import {
    addTask,
    deleteTask,
    updateTask,
    moveTaskToList,
} from "./redux/tasksSlice";
import {
    fetchBoards,
    createBoard,
    setCurrentBoardId,
    deleteBoard,
    updateBoardName,
} from "./redux/boardsSlice";

function AppContainer() {
    const dispatch = useDispatch();
    const {
        items: taskLists,
        status,
        error,
    } = useSelector((state) => state.lists);
    const { boards, currentBoardId } = useSelector((state) => state.boards);

    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isEditingBoard, setIsEditingBoard] = useState(false);
    const [editedBoardName, setEditedBoardName] = useState("");

    useEffect(() => {
        dispatch(fetchBoards()).then((action) => {
            if (action.payload.length > 0 && !currentBoardId) {
                dispatch(setCurrentBoardId(action.payload[0].id));
            }
        });
    }, [dispatch, currentBoardId]);

    useEffect(() => {
        if (currentBoardId) {
            dispatch(fetchLists(currentBoardId));
        }
    }, [dispatch, currentBoardId]);

    const toggleHistory = () => setIsHistoryOpen(!isHistoryOpen);

    const handleEditBoardName = (name = null) => {
        if (name !== null) {
            setEditedBoardName(name);
        } else {
            const currentBoard = boards.find(
                (board) => board.id === currentBoardId
            );
            setEditedBoardName(currentBoard ? currentBoard.name : "");
            setIsEditingBoard(true);
        }
    };

    const handleSaveBoardName = () => {
        if (editedBoardName.trim().length > 0) {
            dispatch(
                updateBoardName({
                    boardId: currentBoardId,
                    name: editedBoardName,
                })
            );
            setIsEditingBoard(false);
        } else {
            alert("The board name cannot be empty.");
        }
    };

    const handleSelectBoard = (boardId) => {
        dispatch(setCurrentBoardId(Number(boardId)));
    };

    const handleAddNewBoard = async () => {
        await dispatch(createBoard("New Board"));
    };

    const handleDeleteBoard = async () => {
        if (currentBoardId) {
            await dispatch(deleteBoard(currentBoardId)).then(async () => {
                const actionResult = await dispatch(fetchBoards());
                const updatedBoards = actionResult.payload;
                if (updatedBoards.length > 0) {
                    dispatch(setCurrentBoardId(updatedBoards[0].id));
                } else {
                    dispatch(setCurrentBoardId(null));
                }
            });
        }
    };

    const handleAddNewList = () => {
        if (currentBoardId) {
            dispatch(addNewList({ name: "New List", boardId: currentBoardId }));
        } else {
            alert("Please select a board first.");
        }
    };

    const handleUpdateTitle = (listId, newName) => {
        dispatch(updateListName({ listId, name: newName })).then(() =>
            dispatch(fetchLists(currentBoardId))
        );
    };
    const handleDeleteList = (listId) => dispatch(deleteList(listId));

    const handleAddTask = (listId, task) => {
        dispatch(addTask({ ...task, taskListId: listId })).then(() =>
            dispatch(fetchLists(currentBoardId))
        );
    };
    const handleDeleteTask = (taskId) =>
        dispatch(deleteTask(taskId)).then(() =>
            dispatch(fetchLists(currentBoardId))
        );
    const handleUpdateTask = (editedTask) => {
        dispatch(
            updateTask({
                taskId: editedTask.taskId,
                updatedTask: { ...editedTask },
            })
        ).then(() => dispatch(fetchLists(currentBoardId)));
    };
    const handleMoveTask = (taskId, newListId) =>
        dispatch(moveTaskToList({ taskId, newListId })).then(() =>
            dispatch(fetchLists(currentBoardId))
        );

    return (
        <App
            taskLists={taskLists}
            boards={boards}
            currentBoardId={currentBoardId}
            onSelectBoard={handleSelectBoard}
            onAddNewBoard={handleAddNewBoard}
            onDeleteBoard={handleDeleteBoard}
            status={status}
            error={error}
            onAddNewList={handleAddNewList}
            onUpdateTitle={handleUpdateTitle}
            onDeleteList={handleDeleteList}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onMoveTask={handleMoveTask}
            isHistoryOpen={isHistoryOpen}
            toggleHistory={toggleHistory}
            isEditingBoard={isEditingBoard}
            editedBoardName={editedBoardName}
            handleEditBoardName={handleEditBoardName}
            handleSaveBoardName={handleSaveBoardName}
        />
    );
}

export default AppContainer;
