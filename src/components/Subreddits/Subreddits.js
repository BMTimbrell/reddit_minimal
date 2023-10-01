import React, { useEffect } from 'react';
import { selectSubreddits, selectIsLoading, selectHasError, loadSubreddits } from './subredditsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Subreddit from './Subreddit';
import { formatImageSrc } from '../../utils/utils';
import './Subreddits.css';

function Subreddits() {
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const subreddits = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    const messageStyle = {fontWeight: 'bold', margin: '0.625rem', fontSize: '20px'};

    useEffect(() => {
        dispatch(loadSubreddits());
    }, [dispatch]);

    if (isLoading) return <p style={messageStyle}>Loading subreddits...</p>;
    if (hasError) return <p style={messageStyle}>Failed to load subreddits</p>;

    return (
        <div className="subreddits">
            <h2>Subreddits</h2>
            {
                subreddits.map(subreddit => (
                    <Subreddit name={subreddit.display_name_prefixed} icon={formatImageSrc(subreddit.community_icon)} key={subreddit.display_name} />
                ))
            }
        </div>
    );
}

export default Subreddits;