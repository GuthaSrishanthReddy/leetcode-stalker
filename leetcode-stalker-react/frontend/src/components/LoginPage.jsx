import {useState} from 'react';
import {loginUser} from '../api/auth.js';

export default function LoginPage({ onLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);  // call App's login
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
