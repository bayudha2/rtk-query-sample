import React from 'react'
import { Routes, Route } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'

import Toaster from './components/Toaster'
import AuthLayouts from './layouts/AuthLayout'
import PrivateLayouts from './layouts/PrivateLayout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Movies from './pages/Movies'
import PageNotFound from './pages/PageNotFound'
import Signup from './pages/Signup'
import User from './pages/User'
import Users from './pages/Users'

const App: React.FC = () => {
  const priveRoutes = [
    {
      element: <Dashboard />,
      path: 'search',
    },
    {
      element: <Movies />,
      path: 'upcoming',
    },
    {
      element: <Movies />,
      path: 'top_rated',
    },
    {
      element: <Movies />,
      path: 'now_playing',
    },
  ]

  return (
    <>
      <main className="App">
        <Routes>
          <Route path="/">
            <Route element={<AuthLayouts />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            <Route element={<PrivateLayouts />}>
              {priveRoutes.map(({ element, path }) => {
                return <Route path={path} element={element} key={path} />
              })}
              <Route path="/users" element={<Users />}>
                <Route path=":id" element={<User />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Toaster />
    </>
  )
}

export default App
