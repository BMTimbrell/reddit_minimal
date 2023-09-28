import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import { selectFilteredPosts, loadPosts, selectSubreddit, selectIsLoading, selectHasError, setSelectedSubreddit } from './redditPostsSlice';
import './Posts.css';

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const subreddit = useSelector(selectSubreddit);
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);

    useEffect(() => {
        dispatch(loadPosts(subreddit));
    }, [subreddit]);

    const onChangeHandler = e => {
        dispatch(setSelectedSubreddit(e.target.value));
    };

    return (
        <div className="posts">
                <h2>r/{subreddit}</h2>
                <input type="text" placeholder="Enter subreddit name" onChange={onChangeHandler} />
            {
                isLoading ? <p>Loading...</p> :
                hasError ? <p>Failed to load posts!</p> :
                posts.map(post => (
                    <Post post={post} key={post.id} />
                ))
            }
        </div>
    );
}

export default Posts;