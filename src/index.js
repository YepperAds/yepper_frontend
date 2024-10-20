import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import Home from './pages/Home'
import About from './pages/About'
import Request from './register/request'

import File from './register/create/File'
import AddCategories from './register/create/Categories'
import AddBusinessForm from './register/create/BusinessInfo'

import Select from './register/import/Select'
import Business from './register/import/Business'
import Advertisers from './register/import/Websites'
import Categories from './register/import/Categories'
import ImportAd from './register/import/Spaces'
import Templates from './register/import/Templates'
import AdPreview from './register/import/AdPreview'

import AdSuccess from './register/import/AdSuccess'

import Dashboard from './dashboard/Home'
import Ads from './dashboard/ads/Ads'
import Apps from './dashboard/apps/Apps'
import Websites from './dashboard/website/Websites'
import Emails from './dashboard/emails/Emails'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Request /> },
      // { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },

      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },

      {
        element: <DashboardLayout />,
        children: [
          // { path: "/request", element: <Request /> },

          { path: "/file", element: <File /> },
          { path: "/add-categories", element: <AddCategories /> },
          { path: "/add-info", element: <AddBusinessForm /> },

          { path: "/select", element: <Select /> },
          { path: "/business", element: <Business /> },
          { path: "/websites", element: <Advertisers /> },
          { path: "/categories", element: <Categories /> },
          { path: "/spaces", element: <ImportAd /> },
          { path: "/templates", element: <Templates /> },
          { path: "/ad-preview", element: <AdPreview /> },

          { path: "/ad-success", element: <AdSuccess /> },

          { path: "/dashboard", element: <Dashboard /> },
          { path: "/ads-dashboard", element: <Ads /> },
          { path: "/apps-dashboard", element: <Apps /> },
          { path: "/websites-dashboard", element: <Websites /> },
          { path: "/emails-dashboard", element: <Emails /> },
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)