import React from 'react';
import { getDateDifference } from '../../utils/utils';

function Comment({ comment }) {
    if (comment.author)
        return (
            <div>
                <hr />
                <p style={{color: 'rgba(0, 0, 0, 0.6)'}}>
                    Posted by {comment.author + ' ' + getDateDifference(comment.created_utc)}
                </p>
                {
                    comment.body
                }
            </div>
        );
}

export default Comment;