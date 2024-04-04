import React from "react";
import TaskForm from "../common/taskform/TaskForm.jsx";
import TaskContainer from "../Task/TaskContainer.jsx";
import Button from "../common/Button/Button.jsx";
import plusIconLight from "../../assets/icons/plusIconLight.svg";
import Modal from "../common/modal/CreateTaskModal.jsx";
import KebabMenu from "../common/KebabMenu/KebabMenu.jsx";
import editIcon from "../../assets/icons/editIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const List = ({
    id,
    title,
    tasks,
    isEditing,
    newTitle,
    onDoubleClick,
    onChangeTitle,
    onBlur,
    isModalOpen,
    onOpenModal,
    onCloseModal,
    onSaveTask,
    onDeleteList,
    onMoveTask,
    taskLists,
    onEditTaskSubmit,
    onDeleteTask,
}) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 m-4 w-72 bg-gray-100 flex flex-col min-w-72">
            <div className="flex justify-between mb-4">
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={onChangeTitle}
                        onBlur={onBlur}
                        autoFocus
                    />
                ) : (
                    <h2 className="column-title" onDoubleClick={onDoubleClick}>
                        {title}
                    </h2>
                )}
                <KebabMenu>
                    <Button icon={editIcon} onClick={onDoubleClick}>
                        Edit
                    </Button>
                    <Button icon={deleteIcon} onClick={() => onDeleteList(id)}>
                        Delete
                    </Button>
                </KebabMenu>
            </div>
            <Button icon={plusIconLight} dark onClick={onOpenModal}>
                Add new task
            </Button>
            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <TaskForm onSave={onSaveTask} />
            </Modal>
            <div className="tasks-list flex flex-col items-center gap-4 mt-5">
                {tasks.map((task) => (
                    <TaskContainer
                        key={task.id}
                        taskId={task.id}
                        taskName={task.taskName}
                        taskDescription={task.taskDescription}
                        dueDate={task.dueDate}
                        priority={task.priority}
                        taskLists={taskLists.filter((list) => list.id !== id)}
                        onMoveTask={onMoveTask}
                        onEditTaskSubmit={onEditTaskSubmit}
                        onDeleteTask={onDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default List;
