import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadSubreddits = createAsyncThunk(
    'subreddits/loadSubreddits',
    async () => {
        const data = await fetch(`https://www.reddit.com/subreddits.json`);
        const json = await data.json();
        return json.data.children.map((subreddit) => (
            subreddit.data
        ));
    }
);

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadSubreddits.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                console.log("loading");
            })
            .addCase(loadSubreddits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.subreddits = action.payload;
            })
            .addCase(loadSubreddits.rejected, (state, action) => {
                state.hasError = true;
                state.isLoading = false;
                console.log(action.error);
            })
    }
});

export default subredditsSlice.reducer;
export const selectSubreddits = state => state.subreddits.subreddits;
export const selectIsLoading = state => state.subreddits.isLoading;
export const selectHasError = state => state.subreddits.hasError;
