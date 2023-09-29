import React from 'react';
import Comment from './Comment';

function Comments({ comments }) {
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