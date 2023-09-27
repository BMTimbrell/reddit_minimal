import React from 'react';
import Comment from '../Comment/Comment';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Post.css';

function Post({post}) {
    const thumbnailEnd = post.thumbnail.substring(post.thumbnail.length - 3, post.thumbnail.length);
    const urlEnd = post.url.substring(post.url.length - 3, post.url.length);
    const hasImg = thumbnailEnd === "png" || thumbnailEnd === "jpg" || urlEnd === "png" || urlEnd === "jpg"
    return (
        <div className="post">
            <h3>{post.title}</h3>
            <Markdown children={post.selftext} remarkPlugins={[remarkGfm]} />
            {
                //check if post has a preview image
                hasImg ?
                    <img src={post.thumbnail === "nsfw" || 
                        post.url.charAt(post.url.length - 1) === "g" ? post.url : post.thumbnail} alt="thumbnail"/>
                :
                    ""
            }
            <hr />
        </div>
    );
}

export default Post;