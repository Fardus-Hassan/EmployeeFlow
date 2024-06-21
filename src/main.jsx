import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Route from './Route/Route.jsx';
import GlobalContext from './Global/GlobalContext.jsx';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'



const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContext>
        <RouterProvider router={Route} />
        <Toaster position="top-center" reverseOrder={false} />
      </GlobalContext>
    </QueryClientProvider>
  </React.StrictMode>
)
