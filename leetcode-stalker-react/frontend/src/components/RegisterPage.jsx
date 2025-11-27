import {useState} from 'react';
import {registerUser} from '../api/auth.js';

export default function RegisterPage({ onSuccessfulRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await registerUser(email, password);
      const {token, user} = response.data;
      localStorage.setItem('token', token);
      onSuccessfulRegister();
    }catch (err) {
        console.log(err?.response?.data);
      setError(err?.response?.data?.message || 'Sign up failed');
    }
  }

  return (
    <div className="signup-page">
      <h2> Welcome to the Sign Up Page! </h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleRegister}>
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
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign-up</button>
      </form>

    <a className='login-here' onClick={() => onSuccessfulRegister()}>Already have an account? Login here.</a>

    </div>
  );
}
