import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Post.css';
import commentIcon from '../../images/comment_icon.png';
import scoreIcon from '../../images/score_icon.png';
import { getDateDifference, roundThousand } from '../../utils/utils';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { loadComments, toggleShowingComments, selectIsShowingComments, showComments } from './redditPostsSlice';
import { useDispatch, useSelector } from 'react-redux';

function Post({ post, showsComments }) {
    const thumbnailEnd = post.thumbnail.substring(post.thumbnail.length - 3, post.thumbnail.length);
    const urlEnd = post.url.substring(post.url.length - 3, post.url.length);
    const hasImg = thumbnailEnd === "png" || thumbnailEnd === "jpg" || urlEnd === "png" || urlEnd === "jpg";
    const dispatch = useDispatch();
    const isShowingComments = useSelector(selectIsShowingComments);

    //Always show comments on first render
    useEffect(() => {
        dispatch(showComments());
    }, [dispatch]);

    const handleClick = () => {
        dispatch(toggleShowingComments());
        dispatch(loadComments(post.permalink));
    };

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
                <Link className="stats" to={`/posts/${post.id}`} onClick={handleClick}>
                    <div className="stats">
                        <img src={commentIcon} alt="comment icon" /> {roundThousand(post.num_comments)}
                        &nbsp;&nbsp;<img src={scoreIcon} alt="score icon" /> {roundThousand(post.score)}
                    </div>
                </Link>
                {
                    showsComments && isShowingComments && <Comments comments={post.comments} />
                }      
            </div>
        );
    };

    return getPost();

}

export default Post;