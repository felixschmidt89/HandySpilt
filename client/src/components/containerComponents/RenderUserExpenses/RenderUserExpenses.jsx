import { Link } from "react-router-dom";
import emojiConstants from "../../../constants/emojiConstants";
import DeleteResourceText from "../../reuseableComponents/DeleteResourceText/DeleteResourceText";
import styles from "./RenderUserExpenses.module.css";

export default function RenderUserExpenses({ item, handleRerender }) {
  return (
    <div className={styles.expenses}>
      <div className={styles.leftColumn}>
        <div className={styles.expenseEmoji}>{emojiConstants.expense}</div>
        <div className={styles.expenseAmount}>
          <p>{item.expenseAmount.toFixed(2)}€</p>
          <Link
            to={`/user-history-item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
            edit
          </Link>
          <DeleteResourceText
            resourceId={item.itemId}
            resourceType={`${item.itemType}s`}
            handleRerender={handleRerender}
          />
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.borderedContent}>
          <ul>
            <li>paid by: {item.expensePayer.userName}</li>
            <li>description: {item.expenseName}</li>
            <li>
              beneficiaries:{" "}
              {item.expenseBeneficiaries
                .map((beneficiary) => beneficiary.userName)
                .join(", ")}
            </li>
            <li>
              amount benefitted: {item.expenseAmountPerBeneficiary.toFixed(2)}€
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
