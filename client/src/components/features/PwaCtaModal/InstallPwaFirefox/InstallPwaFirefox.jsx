import React from "react";

import { HiDotsVertical } from "react-icons/hi";
import { MdInstallMobile } from "react-icons/md";

import styles from "./InstallPwaFirefox.module.css";

const InstallPwaFirefox = ({ closePrompt }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>For the best experience, install our app:</p>
      <ul className={styles.installPwaExplanationList}>
        <li>
          Select <HiDotsVertical className={styles.dotsIcon} /> in your browser,
        </li>
        <li>scroll down,</li>
        <li>
          and press <MdInstallMobile className={styles.installIcon} />{" "}
          (install).
        </li>
      </ul>
    </div>
  );
};

export default InstallPwaFirefox;
