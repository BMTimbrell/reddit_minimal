import React from 'react';
import Comment from '../Comment/Comment';
import './Post.css';

function Post({post}) {
    return (
        <div class="post">
            <h3>{post.title}</h3>
            <p>{post.selftext}</p>
            {
                //check if post has a preview image
                post.thumbnail_width ?
                    <img src={post.thumbnail === "nsfw" || 
                        post.url.charAt(post.url.length - 1) === "g" ? post.url : post.thumbnail} />
                :
                    ""
            }
            {
                /*post.comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))*/
            }
            <hr />
        </div>
    );
}

export default Post;