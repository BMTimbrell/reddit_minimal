import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import { selectFilteredPosts, loadPosts, selectSubreddit, selectIsLoading, selectHasError, setSelectedSubreddit } from './redditPostsSlice';
import './Posts.css';
import { useParams, Outlet } from 'react-router-dom';

function Posts() {
    const messageStyle = {fontWeight: 'bold', margin: '0.625rem', fontSize: '20px'};
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const subreddit = useSelector(selectSubreddit);
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    let { postId } = useParams();
    const loadingMessage = <p style={messageStyle}>Loading...</p>;
    const errorMessage = <p style={messageStyle}>Failed to load posts</p>;

    useEffect(() => {
        dispatch(loadPosts(subreddit));
    }, [subreddit, dispatch]);

    const onChangeHandler = e => {
        dispatch(setSelectedSubreddit(e.target.value));
    };

    if (!postId) {
        return (
            <div className="posts">
                <h2>r/{subreddit}</h2>
                <input type="text" placeholder="Enter subreddit name" onChange={onChangeHandler} />
                {
                    isLoading ? loadingMessage :
                    hasError ? errorMessage :
                    posts.map(post => (
                        <Post post={post} key={post.id} showsComments={false} />
                    ))
                }
            </div>
        );
    } else {
        let filteredPost;
        if (!isLoading && !hasError)
            filteredPost = posts.filter(el => el.id === postId);
        return (
            <div className="posts">
                <h2>r/{subreddit}/post</h2>
                {
                    isLoading ? loadingMessage :
                    hasError ? errorMessage :
                        <Post post={filteredPost[0]} key={filteredPost[0].id} showsComments={true}><Outlet /></Post>
                }
            </div>
        );
    }
   
}

export default Posts;