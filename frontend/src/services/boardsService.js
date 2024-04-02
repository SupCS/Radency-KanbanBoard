const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

export const fetchBoards = () => {
    return fetch(`${API_URL}/boards`).then((response) => response.json());
};

export const createBoard = (name) => {
    return fetch(`${API_URL}/boards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    }).then((response) => response.json());
};

export const updateBoardName = (boardId, name) => {
    return fetch(`${API_URL}/boards/${boardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    }).then((response) => response.json());
};

export const deleteBoard = (boardId) => {
    return fetch(`${API_URL}/boards/${boardId}`, {
        method: "DELETE",
    }).then((response) => response.json());
};
