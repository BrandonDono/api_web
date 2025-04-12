import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import CreateUserPage from './pages/CreateUserPage'; // Asegúrate de importarlo
import EditUserPage from './pages/EditUserPage'; // Asegúrate de importarlo
import DashboardPage from './pages/DashboardPage'; // Asegúrate de importarlo
import { useAuth } from './hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/users"
          element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/create"
          element={isAuthenticated ? <CreateUserPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/edit/:id"
          element={isAuthenticated ? <EditUserPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/:id"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/users' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
