// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Contact from "../../components/features/Contact/Contact/Contact";

// Styles
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("contact-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"contact"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>{t("contact-page-header")}</h1>
        <Contact />
      </div>
    </main>
  );
};

export default ContactPage;
