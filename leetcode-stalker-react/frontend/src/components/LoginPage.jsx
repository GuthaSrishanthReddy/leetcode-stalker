import {useState} from 'react';
import {loginUser} from '../api/auth.js';

export default function LoginPage({ onSuccessfulLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    try {
      const response = await loginUser(email, password);
      const {token, user} = response.data;
      localStorage.setItem('token', token);
      onSuccessfulLogin(user);
    }catch (err) {
        console.log(err?.response?.data);
      setError(err?.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="login-page">
      <h2> Welcome to the Login Page! </h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder='Enter E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
