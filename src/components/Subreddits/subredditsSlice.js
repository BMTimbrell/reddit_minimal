import { createSlice } from '@reduxjs/toolkit';

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        isLoading: false,
        hasError: false
    },
    reducer: {
        
    }
});

export default subredditsSlice.reducer;