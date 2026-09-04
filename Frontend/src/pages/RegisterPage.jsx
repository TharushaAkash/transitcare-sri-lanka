import { useState } from 'react'
import { emptyRegisterForm } from '../complaintShared.js'

export default function RegisterPage({ apiBaseUrl, error, loading, onRegister, onGoLogin }) {
  const [registerForm, setRegisterForm] = useState(emptyRegisterForm)

  const submitRegister = (event) => {
    event.preventDefault()
    onRegister(registerForm)
  }

  return (
    <section className="panel auth-panel">
      <div className="section-head">
        <div>
          <p className="eyebrow">Register page</p>
          <h2>Create a new user account</h2>
        </div>
        <span className="pill">API: {apiBaseUrl}</span>
      </div>

      <form className="auth-form" onSubmit={submitRegister}>
        <div className="split-grid">
          <label className="field">
            <span>First name</span>
            <input
              type="text"
              value={registerForm.firstName}
              onChange={(event) => setRegisterForm((current) => ({ ...current, firstName: event.target.value }))}
              placeholder="Kasun"
              required
            />
          </label>
          <label className="field">
            <span>Last name</span>
            <input
              type="text"
              value={registerForm.lastName}
              onChange={(event) => setRegisterForm((current) => ({ ...current, lastName: event.target.value }))}
              placeholder="Perera"
              required
            />
          </label>
        </div>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={registerForm.email}
            onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="user@example.com"
            required
          />
        </label>
        <div className="split-grid">
          <label className="field">
            <span>Phone number</span>
            <input
              type="text"
              value={registerForm.phoneNumber}
              onChange={(event) => setRegisterForm((current) => ({ ...current, phoneNumber: event.target.value }))}
              placeholder="0712345678"
              required
            />
          </label>
          <label className="field">
            <span>NIC number</span>
            <input
              type="text"
              value={registerForm.nicNumber}
              onChange={(event) => setRegisterForm((current) => ({ ...current, nicNumber: event.target.value }))}
              placeholder="200112345678"
              required
            />
          </label>
        </div>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={registerForm.password}
            onChange={(event) => setRegisterForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="Choose a password"
            required
          />
        </label>
        <div className="button-row">
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
          <button type="button" className="secondary-btn" onClick={onGoLogin}>
            Go to login
          </button>
        </div>
      </form>

      {error ? <p className="error-box">{error}</p> : null}
    </section>
  )
}
