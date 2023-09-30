import React from 'react';
import './Header.css';
import { useSelector } from 'react-redux';
import { selectSubreddit } from '../RedditPosts/redditPostsSlice';

function Header() {
    const subreddit = useSelector(selectSubreddit);
    const onChangeHandler = () => {

    };

    return (
        <header>
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