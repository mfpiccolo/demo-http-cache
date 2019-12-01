import React from 'react'
import Loader from './Loader'
import './App.css'
import PostsPage from './PostsPage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Loader />
      </header>
      <PostsPage></PostsPage>
    </div>
  )
}

export default App
