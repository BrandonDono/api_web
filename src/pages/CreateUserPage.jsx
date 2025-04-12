import React, { useState } from 'react';
import { createUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaKey, FaArrowLeft, FaPlus, FaPhone } from 'react-icons/fa'; // Se agregó FaPhone
import '../App.css';

function CreateUserPage() {
  const [form, setForm] = useState({ name: '', last_name: '', email: '', password: '', phone_number: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    navigate('/users');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Crear Nuevo Usuario</h2>
      <div className="card shadow-lg p-4 border-light rounded-3">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                name="name"
                className="form-control form-control-lg"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                name="last_name"
                className="form-control form-control-lg"
                placeholder="Apellido"
                value={form.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><FaPhone /></span>
              <input
                name="phone_number"
                type="tel"
                className="form-control form-control-lg"
                placeholder="Teléfono"
                value={form.phone_number}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                name="email"
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-group">
              <span className="input-group-text"><FaKey /></span>
              <input
                name="password"
                type="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success btn-lg w-100 mt-3">
              <FaPlus className="me-2" /> Crear Usuario
            </button>
          </div>
          <div className="col-12 mt-3">
            <button
              type="button"
              className="btn btn-secondary btn-lg w-100"
              onClick={handleGoBack}
            >
              <FaArrowLeft className="me-2" /> Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserPage;
