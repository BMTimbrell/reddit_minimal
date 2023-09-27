import { configureStore } from '@reduxjs/toolkit';
import redditPostsReducer from '../components/RedditPosts/redditPostsSlice';
import subredditsReducer from '../components/Subreddits/subredditsSlice';

export default configureStore({
    reducer: {
        redditPosts: redditPostsReducer,
        subreddits: subredditsReducer
    }
});