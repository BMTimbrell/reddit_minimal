import React from 'react';
import Header from '../Header/Header';
import { Outlet, Navigate, useParams } from 'react-router-dom';
import './Home.css';

function Home() {
    const { postId } = useParams();
    return(
        <div className="home">
            <Header />
            <Outlet />
            {
                !postId && <Navigate to="posts" />
            }
            
        </div>
    );
}

export default Home;