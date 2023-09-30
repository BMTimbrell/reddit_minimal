import React, { useEffect } from 'react';
import { selectSubreddits, selectIsLoading, selectHasError, loadSubreddits } from './subredditsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Subreddit from './Subreddit';
import { formatImageSrc } from '../../utils/utils';

function Subreddits() {
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const subreddits = useSelector(selectSubreddits);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSubreddits());
    }, []);

    if (isLoading) return <p>Loading subreddits...</p>;
    if (hasError) return <p>Failed to load subreddits</p>;

    return (
        <div>
            {
                subreddits.map(subreddit => (
                    <Subreddit name={subreddit.display_name_prefixed} icon={formatImageSrc(subreddit.community_icon)} key={subreddit.display_name} />
                ))
            }
        </div>
    );
}

export default Subreddits;