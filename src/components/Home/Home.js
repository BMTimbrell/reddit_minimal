import React from 'react';
import Posts from '../RedditPosts/Posts';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import './Home.css';

function Home() {
    return(
        <div className="home">
            <Header />
            <Posts />
            <Outlet />
        </div>
    );
}

export default Home;