import React, { useEffect } from 'react';
import { selectSubreddits, selectIsLoading, selectHasError, loadSubreddits } from './subredditsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Subreddit from './Subreddit';
import { formatImageSrc } from '../../utils/utils';
import './Subreddits.css';
import { useParams, useNavigate } from 'react-router-dom';
import { setSelectedSubreddit } from '../RedditPosts/redditPostsSlice';

function Subreddits() {
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const subreddits = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    let { postId } = useParams();
    const navigate = useNavigate();
    const messageStyle = {fontWeight: 'bold', margin: '0.625rem', fontSize: '20px'};

    useEffect(() => {
        dispatch(loadSubreddits());
    }, [dispatch]);

    const handleOnClick = (e) => {
        if (postId) navigate('/posts');
        dispatch(setSelectedSubreddit(e.target.value));
    }

    if (isLoading) return <p className="subreddits" style={messageStyle}>Loading subreddits...</p>;
    if (hasError) return <p className="subreddits" style={messageStyle}>Failed to load subreddits</p>;

    return (
        <div className="subreddits">
            <div className="bigScreen">
                <h2 style={postId && {marginBottom: '1.25rem'}}>Subreddits</h2>
                {
                    subreddits.map(subreddit => (
                        <Subreddit
                            name={subreddit.display_name_prefixed}
                            icon={formatImageSrc(subreddit.community_icon)}
                            key={subreddit.display_name}
                        />
                    ))
                }
            </div>
            <div className="smallScreen">
                <h2>Subreddits:</h2>
                <select name="subreddits" id="subreddits">
                    {
                        subreddits.map(subreddit => (
                            <option value={subreddit.display_name} onClick={handleOnClick} key={subreddit.id}>
                                {subreddit.display_name_prefixed}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}

export default Subreddits;