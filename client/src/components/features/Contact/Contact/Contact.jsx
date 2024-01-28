// React and Third-Party Libraries
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import SuccessFeedback from "../SuccessFeedback/SuccessFeedback";
import ContactForm from "../ContactForm/ContactForm";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

// Styles
import styles from "./Contact.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Parent component for user feedback.
 *
 * @function
 * @returns {JSX.Element} - React component.
 */
const Contact = () => {
  const { groupCode } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    messageType: "",
    feedback: "",
  });
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState("");

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    // Clear file, if message type has been changed after adding a screenshot
    if (formData.messageType !== "issue/bug") {
      setFile(null);
    }

    // Clear previous error
    setError("");
    // Validate name
    if (!formData.name.trim()) {
      setError("Name can't be empty.");
      displayErrorModal();
      return;
    }
    if (formData.name.length > 50) {
      setError("Name can't exceed 50 characters.");
      displayErrorModal();
      return;
    }

    // Validate message
    if (!formData.feedback.trim()) {
      setError("Message can't be empty.");
      displayErrorModal();
      return;
    }
    if (formData.feedback.length > 2500) {
      setError("Message can't exceed 2500 characters.");
      displayErrorModal();
      return;
    }

    // Validate file size
    if (file && file.size > 5242880) {
      setError("File size exceeds the allowed limit of 5MB.");
      displayErrorModal();
      return;
    }
    try {
      // Create contactData object & add groupCode for referencing
      const contactData = {
        ...formData,
        groupCode,
      };

      if (file !== null) {
        try {
          const fileData = new FormData();
          fileData.append("file", file);

          const responseFile = await axios.post(`${apiUrl}/files`, fileData);
          devLog("File sent:", responseFile);

          // Add file's ObjectId to the requestData for referencing
          contactData.fileId = responseFile.data.savedFile._id;
        } catch (error) {
          devLog("Error uploading file:", error);
          setError("Error uploading file. Please try again.");
          displayErrorModal();
          return; // Exit early if file upload fails
        }
      }

      const response = await axios.post(`${apiUrl}/feedbacks`, contactData);
      devLog("Feedback sent:", response);
      setShowForm(false);
      // Render feedback and programmatically navigate with a delay
      setTimeout(() => {
        navigate("/instant-split");
      }, 2500);
    } catch (error) {
      devLog("Error creating Feedback:", error);
      setError(genericErrorMessage);
    }
  };

  return (
    <div>
      {showForm ? (
        <div className={styles.container}>
          <ContactForm
            formData={formData}
            handleFileChange={handleFileChange}
            handleInputChange={handleInputChange}
            handleFormSubmission={handleFormSubmission}
          />
          <ErrorModal
            error={error}
            onClose={handleCloseErrorModal}
            isVisible={isErrorModalVisible}
          />{" "}
        </div>
      ) : (
        <SuccessFeedback />
      )}
    </div>
  );
};

export default Contact;
