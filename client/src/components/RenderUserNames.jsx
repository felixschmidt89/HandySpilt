import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function RenderUserNames({ refreshData }) {
  const [userNames, setUserNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const groupCode = localStorage.getItem("activeGroupCode");

    if (!groupCode) {
      return;
    }

    async function fetchUserDetails() {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );
        const responseData = response.data.data;
        if (responseData.users && responseData.users.length > 0) {
          const userNames = responseData.users.map((user) => user.userName);
          setUserNames(userNames);
        }
        setError(null);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching data:", error);
        }
        setError(
          "An error occurred while fetching group users. Please try again later."
        );
      }
    }

    fetchUserDetails();
  }, [refreshData]);

  return (
    <div>
      <h2>User Details</h2>
      <ul style={{ listStyleType: "none" }}>
        {userNames.map((userName) => (
          <li key={userName}>
            <div>
              <strong>{userName}</strong>
            </div>
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
}
