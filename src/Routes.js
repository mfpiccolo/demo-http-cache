import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import PostsPage from './PostsPage'
import PostPage from './PostPage'
import UsersPage from './UsersPage'
import SideBar from './SideBar'

const Routes = () => (
  <Router>
    <div style={{ display: 'flex', minHeight: '95vh' }}>
      <div
        style={{
          padding: '10px',
          width: '15%',
          minWidth: '260px',
          background: '#00688B'
        }}
      >
        <SideBar />
      </div>

      <div style={{ flex: 1, padding: '10px' }}>{renderRoutes(routes)}</div>
    </div>
  </Router>
)

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <h2>Home</h2>
  },
  {
    path: '/posts',
    exact: true,
    component: PostsPage
  },
  {
    path: '/posts/:id',
    component: PostPage
  },
  {
    path: '/users',
    exact: true,
    component: UsersPage
  }
]

export default Routes
