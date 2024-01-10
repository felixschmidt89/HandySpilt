// TODO: Check if needed

import React, { useEffect, useState } from "react";
import axios from "axios";
import { devLog } from "../../../utils/errorUtils";
import { genericErrorMessage } from "../../../constants/errorConstants";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ListGroups = () => {
  const [groupNames, setGroupNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const groupCodesArray = JSON.parse(
          localStorage.getItem("storedGroupCodes")
        );

        if (!groupCodesArray) {
          return;
        }
        // Convert the group codes array to a string
        const groupCodesString = groupCodesArray.join(",");

        const response = await axios.get(
          `${apiUrl}/groups/StoredGroupNames?storedGroupCodes=${groupCodesString}`
        );

        const names = response.data.groupNames.map((groupName) => groupName);
        setGroupNames(names);
      } catch (error) {
        devLog("Error fetching data:", error);
        setError(genericErrorMessage);
      }
    };

    getGroups();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul style={{ listStyleType: "none" }}>
        {groupNames.map((groupName) => (
          <li key={groupName}>{groupName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroups;
