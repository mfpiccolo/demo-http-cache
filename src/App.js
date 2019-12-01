import React from 'react'
import Routes from './Routes'

import PostsLoader from './PostsLoader'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Example CPF</div>
        <PostsLoader />
      </header>
      <Routes></Routes>
    </div>
  )
}

export default App
