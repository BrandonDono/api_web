import React, { useState, useEffect } from 'react';
import { getUsers, updateUser } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaKey, FaArrowLeft, FaSave } from 'react-icons/fa'; // Icono de guardar añadido
import '../App.css';
function EditUserPage() {
  const { id } = useParams(); // Obtiene el id del usuario desde la URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const users = await getUsers();
      const selectedUser = users.find((user) => user.id === parseInt(id));
      setUser(selectedUser);
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(user.id, user);
    navigate('/users'); // Redirige a la lista de usuarios después de la modificación
  };

  const handleGoBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <FaUser className="me-2" /> Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            <FaUser className="me-2" /> Apellido
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            className="form-control"
            value={user.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <FaEnvelope className="me-2" /> Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <FaKey className="me-2" /> Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-3">
          <FaSave className="me-2" /> Actualizar Usuario
        </button>
      </form>
      <button
        type="button"
        className="btn btn-secondary w-100"
        onClick={handleGoBack} // Llama a la función para volver
      >
        <FaArrowLeft className="me-2" /> Regresar
      </button>
    </div>
  );
}

export default EditUserPage;
