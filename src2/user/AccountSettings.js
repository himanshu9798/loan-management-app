import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './AccountSettings.css';


const AccountSettings = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) {
      setUserData(loggedUser);
    }
  }, []);

  if (!userData) return <div>Please login first.</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Update user in users array
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.username === userData.username);

    if (index !== -1) {
      users[index] = userData;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      Swal.fire("Success", "Your data has been updated!", "success");
    }
  };

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          disabled
        />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} />
      </div>

      <div>
        <label>Country:</label>
        <input type="text" name="country" value={userData.country} onChange={handleChange} />
      </div>

      <div>
        <label>Gender:</label>
        <input type="text" name="gender" value={userData.gender} onChange={handleChange} />
      </div>

      <div>
        <label>Role:</label>
        <input type="text" name="role" value={userData.role} disabled />
      </div>

      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default AccountSettings;
