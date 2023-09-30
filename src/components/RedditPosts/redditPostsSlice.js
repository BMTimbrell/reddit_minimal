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
        errorComments: false,
        isShowingComments: false
    },
    reducers: {
        setSelectedSubreddit: (state, action) => {
            if (action.payload === "") state.selectedSubreddit = 'popular';
            else state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
        toggleShowingComments: (state) => {
            state.isShowingComments = !state.isShowingComments;
        },
        showComments: (state) => {
            state.isShowingComments = true;
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
                if (action.payload.length === 0) return;
                for (const post of state.posts) {
                    if (post.id === action.payload[0].data.parent_id.substring(3)) {
                        post.comments = action.payload;
                        console.log('it worked');
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
export const { setSelectedSubreddit, toggleShowingComments, showComments } = redditPostsSlice.actions;
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

export const selectIsShowingComments = state => state.redditPosts.isShowingComments;
export const selectIsLoading = state => state.redditPosts.isLoading;
export const selectHasError = state => state.redditPosts.hasError;
export const selectSubreddit = state => state.redditPosts.selectedSubreddit;
export const selectLoadingComments = state => state.redditPosts.loadingComments;
export const selectErrorComments = state => state.redditPosts.errorComments;