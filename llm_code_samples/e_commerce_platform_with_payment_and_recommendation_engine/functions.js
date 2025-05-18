// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState('');

  const login = async () => {
    const response = await axios.post('http://localhost:3000/login', {
      username: 'user1',
      password: 'password1'
    });
    setToken(response.data.accessToken);
  };

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3000/products', {
      headers: { 'Authorization': token }
    });
    console.log(response.data);
  };

  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={fetchProducts}>Fetch Products</button>
      {/* Other components like product lists, cart, checkout will go here */}
    </div>
  );
}

export default App;