// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupForm from "../../components/features/ManageGroups/CreateGroup/CreateGroupForm/CreateGroupForm";

// Styles
import styles from "./OnboardingCreateGroupPage.module.css";

const OnboardingCreateGroupPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("onboarding-create-group-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"onboarding-create-group"} />
      <InAppNavigationBar back={true} backRoute='/' />
      <div className={styles.container}>
        <CreateGroupForm isExistingUser={false} />
      </div>
    </main>
  );
};

export default OnboardingCreateGroupPage;
