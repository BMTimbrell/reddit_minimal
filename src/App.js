import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Comments from './components/Comments/Comments';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Home /> }>
    <Route path=":postId" element={ <Comments/> }/>
  </Route>
));

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
