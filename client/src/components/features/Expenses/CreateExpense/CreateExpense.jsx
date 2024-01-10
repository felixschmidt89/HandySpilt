// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Components
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput";
import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect";

// Styles
import styles from "./CreateExpense.module.css";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Parent component for creating a new expense.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.groupMembers - An array of group members.
 * @param {string} props.groupCode - The groupCode identifying the group.
 * @returns {JSX.Element} The rendered Create Expense component.
 */
const CreateExpense = ({ groupMembers, groupCode }) => {
  const navigate = useNavigate();

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePayerName, setExpensePayerName] = useState("");
  // Preselect all group members as beneficiaries
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([
    ...groupMembers,
  ]);
  const [error, setError] = useState(null);

  const isSubmitButtonVisible =
    expenseAmount &&
    expensePayerName &&
    expenseDescription &&
    selectedBeneficiaries.length > 0;

  // On form submission: Post expense and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}/expenses`, {
        expenseDescription,
        expenseAmount,
        groupCode,
        expensePayerName,
        expenseBeneficiariesNames: selectedBeneficiaries,
      });
      devLog("Expense created:", response);
      navigate("/instant-split");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          devLog("Error creating expense:", error.response);
          setError(error.response.data.errors[0].message);
        } else {
          setError(genericErrorMessage);
          devLog("Error creating expense:", error);
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.container}>
          <ExpenseDescriptionInput
            value={expenseDescription}
            onDescriptionChange={(value) => setExpenseDescription(value)}
          />
          <ExpenseAmountInput
            value={expenseAmount}
            onAmountChange={(value) => setExpenseAmount(value)}
          />
          <ExpensePayerSelect
            expensePayerName={expensePayerName}
            onPayerChange={(value) => setExpensePayerName(value)}
            groupMembers={groupMembers}
          />
          <ExpenseBeneficiariesInput
            selectedBeneficiaries={selectedBeneficiaries}
            groupMembers={groupMembers}
            onSelectedBeneficiariesChange={setSelectedBeneficiaries}
          />
          {/* Conditionally render submit button */}
          {isSubmitButtonVisible && (
            <button className={styles.button} type='submit'>
              +
            </button>
          )}
        </div>
      </form>
      <ErrorDisplay error={error} />
    </div>
  );
};

export default CreateExpense;
