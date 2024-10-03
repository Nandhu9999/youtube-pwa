import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import HomePage from './components/primary/HomePage.tsx';
import SharePage from './components/primary/SharePage.tsx';
import NotFoundPage from './components/primary/NotFoundPage.tsx';
import HistoryPage from './components/primary/HistoryPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <HomePage />
        ),
      },
      {
        path: "/history",
        element: (
          <HistoryPage />
        ),
      },
      {
        path: "/share",
        element: (
          <SharePage />
        ),
      },
      {
        path: "*",
        element: (
          <NotFoundPage />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
