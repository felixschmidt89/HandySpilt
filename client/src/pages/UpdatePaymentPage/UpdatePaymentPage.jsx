// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

//  Hooks
import usePaymentUpdate from "../../hooks/usePaymentUpdate";
import useDetermineUpdateTransactionPageOpeningSource from "../../hooks/useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import UpdatePayment from "../../components/features/Payments/UpdatePayment/UpdatePayment";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./UpdatePaymentPage.module.css";

const UpdatePaymentPage = () => {
  const { groupCode, paymentId } = useParams();
  const { t } = useTranslation();

  // Use custom hook to identify user's previous route to render appropriate InAppNavigation
  const { isChecked, openedViaGroupHistory, openedViaUserTransactionsHistory } =
    useDetermineUpdateTransactionPageOpeningSource();

  // Use custom hook to manage payment update logic
  const { isLoading, paymentInfo, groupMembers } = usePaymentUpdate(paymentId);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("update-payment-page-title")} />

      <PiratePx COUNT_IDENTIFIER={"update-payment"} />
      {isChecked && openedViaGroupHistory && (
        <InAppNavigationBar previousRoute={true} home={true} />
      )}
      {isChecked && openedViaUserTransactionsHistory && (
        <InAppNavigationBar nestedPreviousRoute={true} home={true} />
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.header}>{t("update-payment-page-header")} </h1>
          <div className={styles.innerContainer}>
            <UpdatePayment
              groupMembers={groupMembers}
              groupCode={groupCode}
              paymentDetails={paymentInfo}
            />
          </div>
        </div>
      )}
    </main>
  );
};
export default UpdatePaymentPage;
