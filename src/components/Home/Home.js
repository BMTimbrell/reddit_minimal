import React, { useEffect } from 'react';
import Header from '../Header/Header';
import { Outlet, Navigate, useParams, useLocation } from 'react-router-dom';
import './Home.css';
import Subreddits from '../Subreddits/Subreddits';

function Home() {
    const { postId } = useParams();
    const  { pathname } = useLocation();
    
    // Scrolls to top of page whenever path changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return(
        <div className="home">
            <Header className="header" />
            <Outlet />
            <Subreddits />
            {
                !postId && <Navigate to="posts" />
            }
            
        </div>
    );
}

export default Home;