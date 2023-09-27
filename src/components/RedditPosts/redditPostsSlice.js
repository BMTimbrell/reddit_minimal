import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadPosts = createAsyncThunk(
    'redditPosts/loadPosts',
    async (subreddit) => {
        const data = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        const json = await data.json();
        return json.data.children.map((post) => post.data);
    }
);

const redditPostsSlice = createSlice({
    name: 'redditPosts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        searchTerm: '',
        selectedSubreddit: 'webdev'
    },
    reducer: {

    },
    extraReducers: builder => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                console.log("loading");
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                console.log(action.payload);
                state.posts = action.payload;
            })
            .addCase(loadPosts.rejected, (state, action) => {
                state.hasError = true;
                state.isLoading = false;
                console.log(action.error);
            });
    }
});

export default redditPostsSlice.reducer;

export const selectPosts = state => state.redditPosts.posts;
export const selectSearchTerm = state => state.redditPosts.searchTerm;
export const selectFilteredPosts = state => {
    const posts = selectPosts(state);
    const searchTerm = selectSearchTerm(state);
    if (searchTerm !== '') {
        return posts.filter(posts =>
            posts.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    return posts;
};
export const selectIsLoading = state => state.redditPosts.isLoading;
export const selectHasError = state => state.redditPosts.hasError;

export const selectSubreddit = state => state.redditPosts.selectedSubreddit;