import { createSlice } from '@reduxjs/toolkit';

const redditPostsSlice = createSlice({
    name: 'redditPosts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        searchTerm: '',
        selectedSubreddit: '/r/webdev'
    },
    reducer: {

    }
});

export default redditPostsSlice.reducer;