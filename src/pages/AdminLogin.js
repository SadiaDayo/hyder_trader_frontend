import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // CHANGE THIS PASSWORD – or better: move to .env
  const ADMIN_PASSWORD = 'hydertraders2026';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin/products');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '120px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          style={{ width: '100%', padding: '12px', margin: '12px 0', fontSize: '16px' }}
          required
        />
        <button
          type="submit"
          style={{ width: '100%', padding: '12px', background: '#FF8821', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px' }}
        >
          Login
        </button>
      </form>
    </div>
  );
}