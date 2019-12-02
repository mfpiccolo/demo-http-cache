import React from 'react'
import Routes from './Routes'
import { useFetchApiSubscription } from './api'
import Loader from './Loader'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Example CPF</div>
        <Loader subscription={useFetchApiSubscription} />
      </header>
      <Routes></Routes>
    </div>
  )
}

export default App
