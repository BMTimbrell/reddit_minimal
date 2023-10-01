import React from 'react';
import { getDateDifference } from '../../utils/utils';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Comment({ comment }) {
    if (comment.author)
        return (
            <div>
                <hr />
                <p style={{color: 'rgba(0, 0, 0, 0.6)'}}>
                    Posted by {comment.author + ' ' + getDateDifference(comment.created_utc)}
                </p>
                {
                    <Markdown children={comment.body} remarkPlugins={[remarkGfm]} />
                }
            </div>
        );
}

export default Comment;