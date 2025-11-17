import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../apis/user.api";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const result = await getAllUsers();
      setUsersData(result.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (usersData.length === 0) {
    return <p>No users available.</p>;
  }

  return (
    <div className="users-section">
      <h2>Users Management</h2>
      <div className="users-grid">
        {usersData.map((user) => (
          <div className="user-card" key={user.id}>
            <h4>{user.user_name}</h4>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
