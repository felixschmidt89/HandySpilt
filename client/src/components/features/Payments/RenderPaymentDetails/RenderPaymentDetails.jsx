// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Styles
import styles from "./RenderPaymentDetails.module.css";

/**
 * Renders payment details including payment amount, maker, and recipient.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.groupCode - The groupCode associated with the group.
 * @param {Object} props.paymentInfo - Payment information.
 * @param {number} props.paymentInfo.paymentAmount - The amount of the payment.
 * @param {Object} props.paymentInfo.paymentMaker - The user who made the payment.
 * @param {Object} props.paymentInfo.paymentRecipient - The user who received the payment.
 * @returns {JSX.Element} - The rendered RenderPaymentDetails component.
 */
const RenderPaymentDetails = ({ groupCode, paymentInfo }) => {
  return (
    <div className={styles.detailsContainer}>
      <h2>{paymentInfo.paymentAmount.toFixed(2)}€</h2>
      <p className={styles.paymentDetails}>
        <span className={styles.userName}>
          {paymentInfo.paymentMaker.userName}
        </span>
        <span className={styles.emoji}>{emojiConstants.paymentsMade}</span>
        <span className={styles.userName}>
          {paymentInfo.paymentRecipient.userName}
        </span>
      </p>
    </div>
  );
};

export default RenderPaymentDetails;
