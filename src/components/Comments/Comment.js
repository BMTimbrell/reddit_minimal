import React from 'react';

function Comment({ comment }) {
    return (
        <div>
            <hr />
            {
                comment.body
            }
        </div>
    );
}

export default Comment;