// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";
import { devLog } from "../../utils/errorUtils";

// Hooks
import useFetchExpenseInfo from "../../hooks/useFetchExpenseInfo";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import RouteButton from "../../components/common/InAppNavigation/RouteButton/RouteButton";
import RenderExpenseBeneficiaries from "../../components/features/Expenses/RenderExpenseBeneficiaries/RenderExpenseBeneficiaries";
import RenderExpenseDetails from "../../components/features/Expenses/RenderExpenseDetails/RenderExpenseDetails";
import RenderResourceCreated from "../../components/common/RenderResourceCreated/RenderResourceCreated";
import DeleteResource from "../../components/common/DeleteResource/DeleteResource";
import InAppNavigation from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Emoji from "../../components/common/Emoji/Emoji";

// Styles
import styles from "./ExpenseDetailsPage.module.css";

const ExpenseDetailsPage = () => {
  const { groupCode, itemId } = useParams();
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);
  const { expenseInfo, isFetched: expenseInfoIsFetched } =
    useFetchExpenseInfo(itemId);
  const { groupMembers, isFetched: groupMembersIsFetched } =
    useFetchGroupMembers(groupCode);
  const { t } = useTranslation();

  devLog("ExpenseInfo fetched", expenseInfo);
  devLog("Group currency fetched:", currencyInfoIsFetched);
  devLog("Group members fetched", groupMembers);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("expense-details-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"expense-details"} />
      <InAppNavigation back={true} />
      {expenseInfoIsFetched &&
      currencyInfoIsFetched &&
      groupMembersIsFetched ? (
        <div className={styles.container}>
          <div className={styles.expenseEmoji}>
            <Emoji label={"expense emoji"} emoji={emojiConstants.expense} />
          </div>
          <h1>{expenseInfo.expenseDescription}</h1>
          <div className={styles.detailsBox}>
            <RenderExpenseDetails
              expenseInfo={expenseInfo}
              groupCurrency={groupCurrency}
              expenseAmountPerBeneficiary={
                expenseInfo.expenseAmountPerBeneficiary
              }
              expenseBeneficiaries={expenseInfo.expenseBeneficiaries}
            />
            <RenderExpenseBeneficiaries
              expenseBeneficiaries={expenseInfo.expenseBeneficiaries}
              allGroupMembersBenefitFromExpense={
                groupMembers.length === expenseInfo.expenseBeneficiaries.length
              }
            />
            <RenderResourceCreated
              createdAt={expenseInfo.createdAt}
              updatedAt={expenseInfo.updatedAt}
            />
          </div>
          <RouteButton
            route={`update-expense/${groupCode}/${itemId}`}
            buttonText={"edit expense"}
            setPreviousRoute={true}
          />
          <DeleteResource resourceId={itemId} resourceType='expenses' />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default ExpenseDetailsPage;
