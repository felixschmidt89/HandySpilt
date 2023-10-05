// DONE adding only meaningful necessary comments
// TODO: HELMET META TAGS DON'T WORK.

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import styles from "./AcceptInviteAndJoinPage.module.css";

/**
 * Addresses users joining a group via invitation link.
 * Renders invitation info including groupName for recognition
 * Renders a brief explanation of the application.
 * Renders join button which triggers storing GroupCode in the client's local storage and navigate to main application
 */
const AcceptInviteAndJoinPage = () => {
  const { groupCode, groupName } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const groupData = useFetchGroupData(groupCode);

  // Set isLoading to false when group data is received.
  useEffect(() => {
    if (groupData !== null && groupData !== undefined) {
      setIsLoading(false);
    }
  }, [groupData]);

  // On confirmation button click: store groupCode in client's localStorage and navigate to instant-split page
  const handleAcceptInvitation = () => {
    storeGroupCodesInLocalStorageHelper(groupCode);
    setGroupCodeToCurrentlyActiveHelper(groupCode);
    navigate("/onboarding");
  };

  // Visually indicate fetching, render button to accept invitation when data is received
  return (
    <main className={styles.container}>
      <Helmet>
        {/* Standard metadata tags */}
        <title>InstantSplit invitation to settle group expenses</title>
        <meta
          name='description'
          content={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
          data-rh='true'
        />
        {/* Facebook tags */}
        <meta property='og:type' content={"website"} />
        <meta
          property='og:title'
          content={"InstantSplit invitation to settle group expenses"}
          data-rh='true'
        />
        <meta
          property='og:description'
          content={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
          data-rh='true'
        />
        {/* Twitter tags */}
        <meta name='twitter:creator' content={groupName} data-rh='true' />
        <meta
          name='twitter:card'
          content={"summary_large_image"}
          data-rh='true'
        />
        <meta
          name='twitter:title'
          content={"InstantSplit invitation to settle group expenses"}
          data-rh='true'
        />
        <meta
          name='twitter:description'
          content={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
          data-rh='true'
        />
        {/* End Twitter tags */}
      </Helmet>
      <h1>Hey there!</h1>
      {isLoading && <Spinner />}
      {!isLoading && groupData && (
        <div className={styles.explanationContainer}>
          <p>
            <div>Someone has given you this link</div>{" "}
            <div>so you can access</div>{" "}
            <div>
              InstantSplit group <strong>{groupData.group.groupName}</strong>
            </div>
            on this device.{" "}
          </p>
          <p className={styles.appExplanation}>
            <div>InstantSplit is the hassle-free way</div>{" "}
            <div>to settle group expenses with </div>
            <div>
              <strong>
                no user registration or app download{" "}
                <div>while sharing minimal data.</div>
              </strong>
            </div>
          </p>
          <p>
            To join your peers' group <strong>{groupName}</strong>, and settle
            expenses immediately, simply accept this invitation.
          </p>
          <h2>Are you in?</h2>
          <button className={styles.button} onClick={handleAcceptInvitation}>
            Sure!
          </button>
        </div>
      )}
    </main>
  );
};

export default AcceptInviteAndJoinPage;
