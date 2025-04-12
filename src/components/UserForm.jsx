import React, { useState, useEffect } from 'react';

function UserForm({ onSubmit, selectedUser }) {
  const [form, setForm] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (selectedUser) {
      setForm({ ...selectedUser, password: '' });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', last_name: '', email: '', password: '' });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">{selectedUser ? 'Actualizar Usuario' : 'Crear Usuario'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Apellido</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="form-control"
              placeholder="Apellido"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required={!selectedUser}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">{selectedUser ? 'Actualizar' : 'Crear'}</button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
