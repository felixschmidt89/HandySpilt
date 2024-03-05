// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import CreateExpense from "../../components/features/Expenses/CreateExpense/CreateExpense";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateUserCTA from "../../components/features/GroupBalancesAndHistory/CreateUserCTA/CreateUserCTA";

// Styles
import styles from "./CreateExpensePage.module.css";

const CreateExpensePage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-expense-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"create-expense"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>{t("create-expense-page-header")}</h1>
        {!isFetched ? (
          <Spinner />
        ) : // Check if there are at least 2 group members
        groupMembers.length <= 1 ? (
          <CreateUserCTA isPayment={false} />
        ) : (
          <CreateExpense groupMembers={groupMembers} groupCode={groupCode} />
        )}
      </div>
    </main>
  );
};

export default CreateExpensePage;
