import React from 'react';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddit } from '../RedditPosts/redditPostsSlice';
import { setSearchTerm } from './searchSlice';

function Header({ className }) {
    const dispatch = useDispatch();
    const subreddit = useSelector(selectSubreddit);
    const onChangeHandler = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    return (
        <header className={className}>
            <h1>Reddit Minimal</h1>
            <input
                type="text" 
                placeholder={`Search posts in r/${subreddit}`} 
                onChange={onChangeHandler} 
            />
        </header>
    );
}

export default Header;