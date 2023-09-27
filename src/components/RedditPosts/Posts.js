import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import { selectFilteredPosts, loadPosts, selectSubreddit } from './redditPostsSlice';

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const subreddit = useSelector(selectSubreddit);

    useEffect(() => {
        dispatch(loadPosts(subreddit));
    }, [subreddit, dispatch]);

    return (
        <div>
            {
                posts.map(post => (
                    <Post post={post} key={post.id} />
                ))
            }
        </div>
    );
}

export default Posts;