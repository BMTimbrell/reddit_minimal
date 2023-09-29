import React from 'react';

function Comment({ comment }) {
    return (
        <div>
            {
                comment.body
            }
            <hr />
        </div>
    );
}

export default Comment;