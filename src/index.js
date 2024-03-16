import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {  Navigate, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import StudentList from './components/StudentList';
import Login from './components/Login';
import { AuthStateProvider, useAuthStateValue } from './context/AuthStateProvider';
import authReducer, { authInitialState } from './context/AuthReducer';
import GuideDashboard from './components/GuideDashboard';
import Menu from './components/Menu';
import StudentDashboard from './components/StudentDashboard';
import PhasesTab from './components/PhaseTab';
import './index.css'
import { StateProvider } from './components/StatePovider';
import reducer, { initialState } from './components/reducer';

function Index() {
  const [{ user }, authdispatch] = useAuthStateValue();
  const [loading, setLoading] = useState(true); // Introduce loading state
  const [selectedDashboard, setSelectedDashboard] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false); // Update loading state if token is not present
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const apiUrl = 'http://localhost:8000/test_token';
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if (response.ok) {
        authdispatch({
          type: "LOGIN",
          payload: responseData
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Update loading state regardless of success or failure
    }
  }

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while fetching user data
  }

  const changeDashboard = (dashboardComponent) => {
    setSelectedDashboard(dashboardComponent);
  };

  // Determine which dashboard component to render based on the user's role
  let dashboardElement;
  if (selectedDashboard) {
    dashboardElement = selectedDashboard; // Use the selectedDashboard state if it's set
  }else if(user){
    switch (user ? user.role : null) {
      case 'Student':
        dashboardElement = <StudentDashboard />;
        break;
      case 'Faculty':
        dashboardElement = <GuideDashboard />;
        break;
      default:
        return <Navigate to="/login" />;
    }
  }
  


  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: (
            <div>
              <Menu role={user?user.role:""} changeDashboard={changeDashboard} />
              {dashboardElement}
            </div>
          ),
        },
        {
          path: '/login',
          element: <Login />,
        },
      ],
    },
    {
      path: '/*',
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <AuthStateProvider initialState={authInitialState} reducer={authReducer}>
      <Index/>
    </AuthStateProvider>
    </StateProvider>

  </React.StrictMode>
);

