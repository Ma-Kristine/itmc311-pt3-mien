import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {
  // user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  // base url
  const BASE_URL = 'https://fordemo-ot4j.onrender.com';

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      // send post request to /users endpoint with username & password
      const res = await axios.post(`${BASE_URL}/users`, { // axios usage
        username,
        password
      });

      // handle api response
      if (res.data.message) {
        setResponse(res.data.message); // display message only
      } else {
        setResponse(JSON.stringify(res.data)); // display entire object if no message field
      }
    } catch (error) {
      console.error(error);
      setResponse('error: unable to connect to api');
    }
  };

  return (
    <div className="page-wrapper">
      {/* title */}
      <h1>User Registration</h1>

      {/* container for centering the card */}
      <div className="container">
        {/* card */}
        <div className="card custom-card shadow p-4">
          <form onSubmit={handleSubmit}>
            {/* input username */}
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your surname"
                required
              />
            </div>

            {/* input password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a fake password"
                required
              />
            </div>

            {/* submit button */}
            <button type="submit" className="btn btn-primary w-100">
              submit
            </button>
          </form>

          {/* display response */}
          {response && (
            <div className="alert alert-info mt-4">
              <strong>Response:</strong> {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
