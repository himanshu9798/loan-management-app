import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

function App() {
  const [formdata, setFormdata] = useState({
    id: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const formsubmit = (e) => {
    e.preventDefault();
    const { id, password, role } = formdata;

    if (!id || !password || !role) {
      Swal.fire({
        title: "Incomplete Form",
        text: "Please fill in all required fields before submitting.",
        icon: "warning",
        confirmButtonText: "Got it",
      });
      return;
    }

    // Get all registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user matching id, password, role
    const foundUser = users.find(
      (u) => u.username === id && u.password === password && u.role === role
    );

    if (!foundUser) {
      Swal.fire({
        title: "Login Failed",
        text: "Invalid username, password or role",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    // Save current logged in user to localStorage (optional)
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    // Navigate based on role
    if (role === "user") {
      Swal.fire({
        text: `Welcome ${id} to user Dashboard`,
        icon: "success",
      }).then(() => {
        navigate("/user");
      });
    }  else if (role === "admin") {
      navigate("/admin");
    }
  };

  return (
    <div className="container">
      <div className="login_Container">
        <div>
          <h1>USER_LOGIN_FORM</h1>
          <form onSubmit={formsubmit}>
            <div className="user_input">
              <label htmlFor="id">Enter the username:</label>
              <br />
              <input
                type="text"
                name="id"
                id="id"
                placeholder="Enter Your Id...."
                value={formdata.id}
                onChange={(e) =>
                  setFormdata({ ...formdata, id: e.target.value })
                }
              />
            </div>
            <div className="user_input">
              <label htmlFor="password">Enter the username:</label>
              <br />
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Enter Password...."
                value={formdata.password}
                onChange={(e) =>
                  setFormdata({ ...formdata, password: e.target.value })
                }
              />
            </div>
            <div className="user_input">
              <label htmlFor="Role">Select your Role:</label>
              <br />
              <select
                name="Role"
                value={formdata.role}
                onChange={(e) =>
                  setFormdata({ ...formdata, role: e.target.value })
                }
              >
                <option value="">---Select your Role---</option>
                <option value="user">User</option>
               
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="button">
              <input type="submit" value="Submit"></input>
            </div>
          </form>
          <h5 style={{ float: "left" }}>Privcy Policy</h5>
          <Link to="/register">
            <h5 style={{ float: "right" }}>Register</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
