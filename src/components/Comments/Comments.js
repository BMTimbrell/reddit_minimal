import React from 'react';
import Comment from './Comment';

function Comments({ comments }) {
    if (comments.length === 0) return <p style={{fontWeight: 'bold', margin: '0.625rem', fontSize: '20px'}}>No replies found</p>;
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