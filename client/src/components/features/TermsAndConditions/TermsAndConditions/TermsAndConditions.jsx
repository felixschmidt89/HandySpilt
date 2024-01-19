// React and Third-Party Libraries
import React from "react";

// Contents
import {
  lastUpdateDate,
  sections,
} from "../../../../contents/termsAndConditionsContent";

// Components
import Disclaimer from "../Disclaimer/Disclaimer";
import SingleTermsAndConditions from "../SingleTermsAndConditions/SingleTermsAndConditions";

// Styles
import styles from "./TermsAndConditions.module.css";

/**
 * Parent component to render terms and conditions
 * @param {string} lastUpdateDate - The last time, the Terms and Conditions have been updated
 * @param {Array} sections - An array of objects representing sections with keys, titles, and content.
 * @returns {JSX.Element} React component. */
const TermsAndConditions = () => {
  return (
    <div className={styles.container}>
      <h1>Terms and Conditions</h1>
      <Disclaimer lastUpdateDate={lastUpdateDate} />
      <h2>Terms and Conditions</h2>
      <SingleTermsAndConditions sections={sections} />
    </div>
  );
};

export default TermsAndConditions;
