// DONE adding only meaningful necessary comments

import React from "react";
import { useState, useEffect, useRef } from "react"; // Import `useRef`
import { useNavigate } from "react-router-dom";
import axios from "axios";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import styles from "./CreateGroupPage.module.css";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import { Helmet } from "react-helmet-async";

export default function CreateGroupPage() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [groupName, setGroupName] = useState("");

  // Autofocus input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // On form submission: store provided group name in database, get related groupCode in exchange, store groupCode in the client's localStorage and navigate to next page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/groups`, {
        groupName,
      });
      const { groupCode } = res.data.data.group;
      storeGroupCodesInLocalStorageHelper(groupCode);
      setGroupCodeToCurrentlyActiveHelper(groupCode);
      setGroupName("");
      navigate("/create-users-signup");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating group:", error);
      }
    }
  };

  // controlled component to set groupName state
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  // render back button to abort and input field, conditionally render submit button
  return (
    <main>
      <Helmet>
        <title>InstantSplit - Create group</title>
      </Helmet>
      <NavigateButton
        route={"homepage"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h2>Create a group</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='text'
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder='group name'
          required
          minLength={1}
          maxLength={50}
          pattern='.*\S+.*'
          ref={inputRef}
          autoFocus
        />
        {groupName.length >= 1 && (
          <div className={styles.buttonContainer}>
            <button className={styles.button} type='submit'>
              +
            </button>
          </div>
        )}
      </form>
    </main>
  );
}
