import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: ''
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
});

export default searchSlice.reducer;
export const { setSearchTerm } = searchSlice.actions;
export const selectSearchTerm = state => state.search.searchTerm;