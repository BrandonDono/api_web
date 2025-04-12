import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import '../App.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await loginAPI(form.email, form.password);
      if (!res.token) throw new Error();
      login(res.token);
      navigate('/users');
    } catch (err) {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '50px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="table p-4 shadow rounded bg-white">
            <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label className="form-label fw-semibold">Correo electrónico</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Correo"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success animated-btn">
                  <FaSignInAlt className="me-2" /> Entrar
                </button>
              </div>
            </form>
            {error && <p className="text-danger text-center mt-3">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
