import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../Header/searchSlice';

export const loadPosts = createAsyncThunk(
    'redditPosts/loadPosts',
    async (subreddit) => {
        const data = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        const json = await data.json();
        return json.data.children.map((post) => (
            {
                ...post.data,
                isShowingComments: false,
                comments: []
            }
            
        ));
    }
);

export const loadComments = createAsyncThunk(
    'redditPosts/loadComments',
    async (permalink) => {
        const data = await fetch(`https://www.reddit.com${permalink}.json`);
        const json = await data.json();
        return json[1].data.children;     
    }
);

const redditPostsSlice = createSlice({
    name: 'redditPosts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        selectedSubreddit: 'popular',
        loadingComments: false,
        errorComments: false
    },
    reducers: {
        setSelectedSubreddit: (state, action) => {
            if (action.payload === "") state.selectedSubreddit = 'popular';
            else state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
        toggleShowingComments: (state, action) => {
            state.posts[action.payload].isShowingComments = 
                !state.posts[action.payload].isShowingComments;
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
                state.loadingComments = true;
                state.errorComments = false;
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.loadingComments = false;
                state.errorComments = false;
                for (const post of state.posts) {
                    if (post.id === action.payload[0].parentId) {
                        post.comments = action.payload;
                        break;
                    }
                }
            })
            .addCase(loadComments.rejected, (state, action) => {
                state.errorComments = true;
                state.loadingComments = false;
                console.log(action.error);
            })
    }
});

export default redditPostsSlice.reducer;
export const { setSelectedSubreddit, toggleShowingComments } = redditPostsSlice.actions;
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