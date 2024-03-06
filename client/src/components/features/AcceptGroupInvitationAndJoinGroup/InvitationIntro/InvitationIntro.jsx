// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./InvitationIntro.module.css";

/**
 * Component to introduce users to InstantSplit when they receive a group invitation.
 *
 * @param {Object} props - React props.
 * @param {Object} props.groupName
 * @returns {JSX.Element} React component. */

const InvitationIntro = ({ groupName }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p>{t("invitation-intro-copy", { groupName })}</p>
    </div>
  );
};

export default InvitationIntro;
