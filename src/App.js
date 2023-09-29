import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Comments from './components/Comments/Comments';
import Posts from './components/RedditPosts/Posts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> }>
          <Route path="posts" element={ <Posts /> }>
            <Route path=":postId" element={ <Comments /> }/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
