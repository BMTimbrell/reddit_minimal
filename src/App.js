import './App.css';
import React from 'react';
import Posts from './components/RedditPosts/Posts';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Posts />
    </div>
  );
}

export default App;
