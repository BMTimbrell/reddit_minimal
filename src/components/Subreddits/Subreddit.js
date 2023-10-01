import React from 'react';
import './Subreddit.css';
import { setSelectedSubreddit } from '../RedditPosts/redditPostsSlice';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

function Subreddit({ name, icon }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { postId } = useParams();
    const handleOnClick = () => {
        if (postId) navigate('/posts');
        dispatch(setSelectedSubreddit(name.substring(2)));
        window.scrollTo(0, 0);
    };

    return (
        <div className="subreddit" onClick={handleOnClick}>
            {
                !icon && <img
                    src="https://styles.redditmedia.com/t5_5s5qbl/styles/communityIcon_hkq7zlki8ug81.png"
                 alt="subreddit icon" />
            }
            {
                icon && <img src={icon} alt="subreddit icon" />
            }
            {name}
        </div>
    );
}

export default Subreddit;