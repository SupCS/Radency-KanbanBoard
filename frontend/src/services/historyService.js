const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

export const fetchHistoryLogs = (boardId) => {
    const url = boardId
        ? `${API_URL}/activity-logs?boardId=${boardId}`
        : `${API_URL}/activity-logs`;
    return fetch(url).then((response) => response.json());
};

export const clearHistoryLogs = (boardId) => {
    const url = boardId
        ? `${API_URL}/activity-logs?boardId=${boardId}`
        : `${API_URL}/activity-logs`;
    return fetch(url, { method: "DELETE" });
};

export const fetchHistoryLogsForTask = (taskId) => {
    const url = taskId
        ? `${API_URL}/activity-logs?taskId=${taskId}`
        : `${API_URL}/activity-logs`;
    return fetch(url).then((response) => response.json());
};
