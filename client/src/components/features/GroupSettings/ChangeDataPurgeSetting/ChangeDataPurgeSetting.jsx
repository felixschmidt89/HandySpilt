// React and Third-Party Libraries
import React, { useState } from "react";
import axios from "axios";
import { FormControlLabel, Switch } from "@mui/material";

// Constants and Utils
import {
  devLog,
  handleApiErrorsAndTriggerErrorModal,
} from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";
import { INACTIVE_DAYS } from "../../../../constants/dataConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

// Styles
import styles from "./ChangeDataPurgeSetting.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for rendering group inactivity information and settings.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.groupCode - The group code.
 * @param {boolean} props.inactiveDataPurge - Flag indicating whether data purge is currently active.
 * @returns {JSX.Element} React component.
 */
const ChangeDataPurgeSetting = ({ groupCode, inactiveDataPurge }) => {
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(inactiveDataPurge);

  const handleToggleClick = async () => {
    try {
      const updatedIsActive = !isActive;
      setIsActive(updatedIsActive);
      const response = await axios.patch(
        `${apiUrl}/groups/inactiveDataPurge/${groupCode}`,
        {
          groupCode,
          inactiveDataPurge: updatedIsActive,
        }
      );
      devLog("inactiveDataPurge setting updated:", response);
    } catch (error) {
      if (error.response) {
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog("Error updating inactive group data purge setting:", error);
        displayErrorModal();
      }
    }
  };

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  return (
    <>
      {" "}
      <div className={styles.container}>
        <h2 className={styles.header}>data purge</h2>
        <div className={styles.box}>
          <p className={styles.explanation}>
            Delete group and its associated data (including group members,
            expenses & payments) after {INACTIVE_DAYS} days of group inactivity.
          </p>
          <form onSubmit={handleToggleClick} className={styles.toggle}>
            <FormControlLabel
              value='bottom'
              control={
                <Switch
                  checked={isActive}
                  onChange={handleToggleClick}
                  size='small'
                />
              }
            />{" "}
          </form>
        </div>

        <ErrorModal
          error={error}
          onClose={handleCloseErrorModal}
          isVisible={isErrorModalVisible}
        />
      </div>
    </>
  );
};

export default ChangeDataPurgeSetting;
