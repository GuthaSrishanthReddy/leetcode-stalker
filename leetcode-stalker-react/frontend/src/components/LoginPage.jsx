import {useState} from 'react';
import {loginUser} from '../api/auth.js';

export default function LoginPage({ onLogin, error , updateView }) {
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
      <button type="submit" style={{border: "solid"}}>Login</button>


      <a href="#" onClick={(e) => { e.preventDefault(); updateView("register"); }}>
        dont have and account ? Register here.
      </a>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
