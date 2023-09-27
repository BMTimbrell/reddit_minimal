import React from 'react';
import Comment from '../Comment/Comment';

function Post({post}) {
    return (
        <div>
            <p>{post.title}</p>
            {
                /*post.comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))*/
            }
        </div>
    );
}

export default Post;