import React from 'react';
import Comment from './Comment';
import { selectLoadingComments, selectErrorComments } from '../RedditPosts/redditPostsSlice';
import { useSelector } from 'react-redux';

function Comments({ comments }) {
    const messageStyle = {fontWeight: 'bold', margin: '0.625rem', fontSize: '20px'};
    const errorComments = useSelector(selectErrorComments);
    const loadingComments = useSelector(selectLoadingComments);
    if (errorComments) return <p style={messageStyle}>Error loading comments</p>;
    if (loadingComments) return <p style={messageStyle}>Loading comments...</p>;
    if (comments.length === 0) return <p style={messageStyle}>No replies found</p>;
    return (
        <>
            {   
                comments.map(comment => (
                    <Comment key={comment.data.id} comment={comment.data} />
                ))
            }
        </>
    );
}

export default Comments;