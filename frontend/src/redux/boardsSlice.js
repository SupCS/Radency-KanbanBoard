import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as boardsService from "../services/boardsService";

export const fetchBoards = createAsyncThunk(
    "boards/fetchBoards",
    async (_, { rejectWithValue }) => {
        try {
            return await boardsService.fetchBoards();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createBoard = createAsyncThunk(
    "boards/createBoard",
    async (name, { rejectWithValue }) => {
        try {
            return await boardsService.createBoard(name);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBoardName = createAsyncThunk(
    "boards/updateBoardName",
    async ({ boardId, name }, { rejectWithValue }) => {
        try {
            return await boardsService.updateBoardName(boardId, name);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBoard = createAsyncThunk(
    "boards/deleteBoard",
    async (boardId, { rejectWithValue }) => {
        try {
            await boardsService.deleteBoard(boardId);
            return boardId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const boardsSlice = createSlice({
    name: "boards",
    initialState: {
        boards: [],
        currentBoardId: null,
        status: "idle",
        error: null,
    },
    reducers: {
        setCurrentBoardId(state, action) {
            state.currentBoardId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.boards = action.payload.sort((a, b) => a.id - b.id);
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.boards.push(action.payload);
                state.currentBoardId = action.payload.id; // Automatically select the new board
            })
            .addCase(updateBoardName.fulfilled, (state, action) => {
                const index = state.boards.findIndex(
                    (board) => board.id === action.payload.id
                );
                if (index !== -1) {
                    state.boards[index] = action.payload;
                }
            })
            .addCase(deleteBoard.fulfilled, (state, action) => {
                state.boards = state.boards.filter(
                    (board) => board.id !== action.payload
                );
                if (state.currentBoardId === action.payload) {
                    state.currentBoardId = null;
                }
            });
    },
});

export const { setCurrentBoardId } = boardsSlice.actions;

export default boardsSlice.reducer;
