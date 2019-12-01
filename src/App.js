import React from 'react'
import Routes from './Routes'

import ApiLoader from './ApiLoader'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Example CPF</div>
        <ApiLoader />
      </header>
      <Routes></Routes>
    </div>
  )
}

export default App
