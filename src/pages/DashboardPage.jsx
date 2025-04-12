import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers } from '../services/api';
import { FaUser, FaEnvelope, FaArrowLeft } from 'react-icons/fa'; // Iconos importados
import '../App.css';
function DashboardPage() {
  const { id } = useParams();  // Obtiene el id del usuario desde la URL
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const data = await getUsers();  // Asegúrate de que getUsers devuelve todos los usuarios
    const selectedUser = data.find(user => user.id === parseInt(id)); // Encuentra el usuario por id
    setUser(selectedUser);
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Perfil del Usuario</h2>
      {user ? (
        <div className="card shadow-lg border-light rounded-3">
          <div className="card-body">
            <h5 className="card-title text-center text-success mb-3">Detalles del Usuario</h5>
            <div className="row">
              <div className="col-md-6">
                <p><FaUser className="me-2" /><strong>Nombre Completo:</strong> {user.name} {user.last_name}</p>
                <p><FaEnvelope className="me-2" /><strong>Email:</strong> {user.email}</p>
              </div>
              <div className="col-md-6">
                {/* Puedes agregar más información aquí si lo deseas */}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button 
                onClick={() => window.history.back()} 
                className="btn btn-outline-secondary btn-lg d-flex align-items-center"
              >
                <FaArrowLeft className="me-2" /> Volver
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">Cargando datos...</p>
      )}
    </div>
  );
}

export default DashboardPage;
