import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Post.css';
import { getDateDifference, roundThousand } from '../../utils/utils';
import { Link } from 'react-router-dom';

function Post({post}) {
    const thumbnailEnd = post.thumbnail.substring(post.thumbnail.length - 3, post.thumbnail.length);
    const urlEnd = post.url.substring(post.url.length - 3, post.url.length);
    const hasImg = thumbnailEnd === "png" || thumbnailEnd === "jpg" || urlEnd === "png" || urlEnd === "jpg";

    const getPost = () => {
        return (
            <div className="post">
            <p className="time">Posted by {post.author + ' ' + getDateDifference(post.created_utc)}</p>
            <h3>{post.title}</h3>
            <Markdown className="content" children={post.selftext} remarkPlugins={[remarkGfm]} />
            {
                //check if post has a preview image
                hasImg && !post.is_video ?
                    <img className="thumbnail" src={post.thumbnail === "nsfw" || 
                        post.url.charAt(post.url.length - 1) === "g" ? post.url : post.thumbnail} alt="thumbnail"/>
                :
                    ""
            }
            {
                post.is_video ? 
                <video controls>
                    <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                : 
                    ""
            }
            <hr />
                <Link className="stats" to={`/${post.id}`}>
                    <div className="stats">
                        <img src="../images/comment_icon.png" alt="comment icon" /> {roundThousand(post.num_comments)}
                        &nbsp;&nbsp;<img src="../images/score_icon.png" alt="score icon" /> {roundThousand(post.score)}
                    </div>
                </Link>
        </div>
        );
    };

    return getPost();

}

export default Post;