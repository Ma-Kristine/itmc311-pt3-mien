import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const BASE_URL = "https://fordemo-ot4j.onrender.com";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState(""); // for Step 4
  const [response, setResponse] = useState("");
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState(""); // step 2 output
  const [userId, setUserId] = useState(""); // step 3 output (id)
  const [currentStep, setCurrentStep] = useState(1);

  // ✅ Step 1
  const handleStep1 = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/`);
      setResponse(res.data.message || JSON.stringify(res.data));
      setCurrentStep(2);
    } catch (err) {
      setResponse("Error connecting to backend");
    }
  };

  // ✅ Step 2
  const handleStep2 = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/users`, {
        username,
        password,
      });
      setResponse(res.data.message);
      setCode(res.data.code);
      setUserId(res.data.id);
      setCurrentStep(3);
    } catch (err) {
      setResponse("Error creating user");
    }
  };

  // ✅ Step 3
  const handleStep3 = async () => {
    if (!code) return setResponse("No code available from step 2");
    try {
      const res = await axios.get(`${BASE_URL}/users/${code}`);
      setResponse(res.data.message);
      setUserId(res.data.id);
      setCurrentStep(4);
    } catch (err) {
      setResponse("Error fetching user by code");
    }
  };

  // ✅ Step 4 (update username dynamically)
  const handleStep4 = async (e) => {
    e.preventDefault();
    if (!userId) return setResponse("No user id available from step 3");
    try {
      const res = await axios.patch(`${BASE_URL}/users/${userId}`, {
        username: newUsername,
      });
      setResponse(res.data.message);
      setCurrentStep(5);
    } catch (err) {
      setResponse("Error updating username");
    }
  };

  // ✅ Step 5
  const handleStep5 = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      setResponse(res.data.message);
      setUsers(res.data.users);
      setCurrentStep(6);
    } catch (err) {
      setResponse("Error fetching all users");
    }
  };

  // ✅ Step 6 (delete with backend response handling)
  const handleStep6 = async () => {
    if (!userId) return setResponse("No user id available");
    try {
      const res = await axios.delete(`${BASE_URL}/users/${userId}`);
      setResponse(res.data.message || JSON.stringify(res.data));
    } catch (err) {
      if (err.response && err.response.data) {
        setResponse(err.response.data.message || JSON.stringify(err.response.data));
      } else {
        setResponse("Error deleting user");
      }
    }
  };

  // Back
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setResponse("");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <h1>ITMC311 PT_03</h1>

        <div className="container">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="card p-3 shadow mb-3">
              <h5>Step 1: Check Backend Setup</h5>
              <button className="btn btn-info" onClick={handleStep1}>
                Run Step 1
              </button>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="card p-3 shadow mb-3 position-relative">
              <div className="back-arrow" onClick={handleBack}>
                &#8592;
              </div>
              <h5>Step 2: Create User</h5>
              <form onSubmit={handleStep2}>
                <div className="mb-2">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create User
                </button>
              </form>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="card p-3 shadow mb-3 position-relative">
              <div className="back-arrow" onClick={handleBack}>
                &#8592;
              </div>
              <h5>Step 3: Fetch User by Code</h5>
              <button className="btn btn-info me-2" onClick={handleStep3}>
                Fetch with Code ({code || "no code yet"})
              </button>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="card p-3 shadow mb-3 position-relative">
              <div className="back-arrow" onClick={handleBack}>
                &#8592;
              </div>
              <h5>Step 4: Update Username</h5>
              <form onSubmit={handleStep4}>
                <div className="mb-2">
                  <label className="form-label">New Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-warning">
                  Update Username
                </button>
              </form>
            </div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <div className="card p-3 shadow mb-3 position-relative">
              <div className="back-arrow" onClick={handleBack}>
                &#8592;
              </div>
              <h5>Step 5: Fetch All Users</h5>
              <button className="btn btn-success me-2" onClick={handleStep5}>
                Fetch All Users
              </button>
            </div>
          )}

          {/* Step 6 */}
          {currentStep === 6 && (
            <div className="card p-3 shadow mb-3 position-relative">
              <div className="back-arrow" onClick={handleBack}>
                &#8592;
              </div>
              <h5>Step 6: Delete User</h5>
              <button className="btn btn-danger" onClick={handleStep6}>
                Delete User by ID ({userId || "no id yet"})
              </button>
            </div>
          )}

          {/* Response */}
          {response && (
            <div className="alert alert-info mt-3">
              <strong>Response:</strong> {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
