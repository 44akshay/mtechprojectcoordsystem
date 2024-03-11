import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import StudentList from './components/StudentList';
import Login from './components/Login';
import { AuthStateProvider } from './context/AuthStateProvider';
import authReducer, { authInitialState } from './context/AuthReducer';
import GuideDashboard from './components/GuideDashboard';
import Menu from './components/Menu';


const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/dashboard",
        element:<div>
              <Menu/>
              <GuideDashboard/>
            </div>
      },{
          path:"/login",
          element:<Login/>
      }
    ]
  },{
    path:"/*",
    element:<Navigate to="/" />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthStateProvider initialState={authInitialState} reducer={authReducer}>
    <RouterProvider router={router}/>
    </AuthStateProvider>

  </React.StrictMode>
);

