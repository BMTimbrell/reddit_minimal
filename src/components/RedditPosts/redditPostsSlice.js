import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../Header/searchSlice';

export const loadPosts = createAsyncThunk(
    'redditPosts/loadPosts',
    async (subreddit) => {
        const data = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        const json = await data.json();
        return json.data.children.map((post) => post.data);
    }
);

export const loadComments = createAsyncThunk(
    'redditPosts/loadComments',
    async (permalink) => {
        const data = await fetch(`https://www.reddit.com${permalink}.json`);
        const json = await data.json();
    }
);

const redditPostsSlice = createSlice({
    name: 'redditPosts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        selectedSubreddit: 'popular'
    },
    reducers: {
        setSelectedSubreddit: (state, action) => {
            if (action.payload === "") state.selectedSubreddit = 'popular';
            else state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        }
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
                state.posts = action.payload;
            })
            .addCase(loadPosts.rejected, (state, action) => {
                state.hasError = true;
                state.isLoading = false;
                console.log(action.error);
            }).addCase(loadComments.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                console.log("loading");
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.posts = action.payload;
            })
            .addCase(loadComments.rejected, (state, action) => {
                state.hasError = true;
                state.isLoading = false;
                console.log(action.error);
            })
    }
});

export default redditPostsSlice.reducer;
export const {setSelectedSubreddit} = redditPostsSlice.actions;
export const selectPosts = state => state.redditPosts.posts;
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