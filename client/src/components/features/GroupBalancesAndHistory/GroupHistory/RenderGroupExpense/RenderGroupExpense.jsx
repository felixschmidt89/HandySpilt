// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../../../../constants/emojiConstants";

// Styles
import styles from "./RenderGroupExpense.module.css";

/**
 * Component for rendering a single group expense.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.item - The expense item to render.
 * @returns {JSX.Element} - Rendered component.
 */
const RenderGroupExpense = ({ item, groupCode }) => {
  return (
    <div className={styles.expenses}>
      {/* Left column containing expense emoji and amount */}
      <div className={styles.leftColumn}>
        <div className={styles.expenseEmoji}>{emojiConstants.expense}</div>
        <div className={styles.expenseAmount}>
          <Link to={`/expense-page/${groupCode}/${item.itemId}`}>
            {item.expenseAmount.toFixed(2)}€
          </Link>
        </div>
      </div>
      {/* Right column containing expense details */}
      <div className={styles.rightColumn}>
        <div className={styles.borderedContent}>
          {emojiConstants.paidBy} {item.expensePayer.userName}:{" "}
          {/* Link to the detailed item page */}
          <Link to={`/expense-page/${groupCode}/${item.itemId}`}>
            {item.expenseDescription}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenderGroupExpense;
