import React from 'react'
import ReactDOM from 'react-dom/client'

import '../src/scss/styles.scss'
import * as bootstrap from 'bootstrap'

import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ContextProvider } from './contextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
