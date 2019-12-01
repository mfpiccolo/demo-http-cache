import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PostsPage from './PostsPage'

const Routes = () => (
  <Router>
    <div style={{ display: 'flex', minHeight: '95vh' }}>
      <div
        style={{
          padding: '10px',
          width: '15%',
          minWidth: '260px',
          background: '#f0f0f0'
        }}
      >
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>

        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: '10px' }}>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
)

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: '/posts',
    sidebar: () => <div>posts!</div>,
    main: PostsPage
  },
  {
    path: '/users',
    sidebar: () => <div>users!</div>,
    main: () => <h2>Users</h2>
  }
]

export default Routes
