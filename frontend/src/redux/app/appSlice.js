import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isFetching: false,
    },
    reducers: {
        setAppFetching(state, action){
            state.isFetching = action.payload;
        }
    }
});

export const {setAppFetching} = appSlice.actions;
export default appSlice.reducer;