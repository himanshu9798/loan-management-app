import React, { useEffect, useState } from "react";

const AdHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(allUsers);
  }, []);

  return (
    <div>
      <h2>Admin Dashboard - All Users</h2>
      <table border={1} style={{width:"100%", borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th>Username</th><th>Email</th><th>Role</th><th>Country</th><th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={idx}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.country}</td>
              <td>{u.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdHome;
