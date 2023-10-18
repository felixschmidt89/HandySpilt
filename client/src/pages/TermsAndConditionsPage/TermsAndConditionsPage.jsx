// DONE adding only meaningful necessary comments

import React from "react";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import styles from "./TermsAndConditions.module.css";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";
import {
  sections,
  lastUpdateDate,
} from "../../contents/termsAndConditionsContent";
const TermsAndConditionsPage = () => {
  return (
    <main>
      {/* Set meta tags for the page */}
      <HelmetMetaTagsNetlify
        title='InstantSplit - Terms and Conditions'
        description={`Instant Split - Terms and Conditions. Last updated on ${lastUpdateDate}.`}
      />
      {/* Track page renders */}
      <PiratePx COUNT_IDENTIFIER={"terms-and-conditions"} />
      {/* Create a button for navigating to homepage */}
      <NavigateButton
        route={"homepage"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />{" "}
      <div className={styles.container}>
        {/* Display the main title */}
        <h1>Terms and Conditions</h1>
        {/* Render a note about accepting terms and conditions and last update */}
        <p className={styles.note}>
          By using InstantSplit, you acknowledge and accept our terms and
          conditions. If you do not agree with these terms, please do not use
          the application. These terms and conditions were last updated on{" "}
          <strong>{lastUpdateDate}</strong>.
        </p>
        {/* Map through the terms and conditions content and display each section */}
        {sections.map((section) => (
          <div key={section.key}>
            <h2 className={styles.header}>{section.title}</h2>
            <p className={styles.content}>{section.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;
