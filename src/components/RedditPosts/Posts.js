import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import { selectFilteredPosts, loadPosts, selectSubreddit, selectIsLoading, selectHasError, setSelectedSubreddit } from './redditPostsSlice';
import './Posts.css';
import { useParams } from 'react-router-dom';

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const subreddit = useSelector(selectSubreddit);
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    let { postId } = useParams();

    useEffect(() => {
        dispatch(loadPosts(subreddit));
    }, [subreddit]);

    const onChangeHandler = e => {
        dispatch(setSelectedSubreddit(e.target.value));
    };
    if (!postId) {
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
    } else {
        let post = posts.filter(el => el.id === postId);
        return (
            <div className="posts">
                    <h2>r/{subreddit}</h2>
                {
                    isLoading ? <p>Loading...</p> :
                    hasError ? <p>Failed to load posts!</p> :
                        <Post post={post[0]} key={post[0].id} />
                }
            </div>
        );
    }
   
}

export default Posts;