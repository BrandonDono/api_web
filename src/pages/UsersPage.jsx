import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaUserPlus } from 'react-icons/fa';
import '../App.css';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Usuarios</h2>
      <button 
        onClick={() => navigate('/users/create')} 
        className="btn btn-success mb-3 d-flex align-items-center animate__animated animate__pulse animate__infinite"
      >
        <FaUserPlus className="me-2" /> Crear Usuario
      </button>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover shadow-lg rounded">
          <thead className="thead-light bg-primary text-white">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="animate__animated animate__fadeIn animate__delay-1s">
                <td>{user.name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number || 'No disponible'}</td>
                <td className="d-flex justify-content-around">
                  <button 
                    onClick={() => navigate(`/users/edit/${user.id}`)} 
                    className="btn btn-warning btn-sm me-2 animate__animated animate__fadeIn animate__delay-1s"
                    title="Editar"
                  >
                    <FaEdit className="me-2" /> Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="btn btn-danger btn-sm me-2 animate__animated animate__fadeIn animate__delay-1s"
                    title="Eliminar"
                  >
                    <FaTrash className="me-2" /> Eliminar
                  </button>
                  <button 
                    onClick={() => navigate(`/dashboard/${user.id}`)} 
                    className="btn btn-info btn-sm animate__animated animate__fadeIn animate__delay-1s"
                    title="Ver Datos"
                  >
                    <FaEye className="me-2" /> Ver Datos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;
