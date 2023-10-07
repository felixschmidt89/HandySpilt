// DONE adding only meaningful necessary comments

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import styles from "./AcceptInviteAndJoinPage.module.css";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

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

  // TODO: Kept in case HelmetMetaTagNetlify component is too generic to work for this page. Delete if not.
  // const encodedGroupName = encodeURIComponent(groupName);
  // const encodedGroupCode = encodeURIComponent(groupCode);
  // const canonicalUrl = `https://instantsplit.netlify.app/join/${encodedGroupName}/${encodedGroupCode}`;

  // Set isLoading to false when group data is received.
  useEffect(() => {
    if (groupData !== null && groupData !== undefined) {
      setIsLoading(false);
    }
  }, [groupData]);

  // On confirmation button click: store groupCode in client's localStorage and navigate to onboarding page
  const handleAcceptInvitation = () => {
    storeGroupCodesInLocalStorageHelper(groupCode);
    setGroupCodeToCurrentlyActiveHelper(groupCode);
    navigate("/onboarding");
  };

  // Updating Visually indicate fetching, render button to accept invitation when data is received
  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`Invitation to join ${groupName}`}
        description={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
      />
      <div className={styles.explanationContainer}>
        <h1>Hey there!</h1>
        {isLoading && <Spinner />}
        {!isLoading && groupData && (
          <>
            <p>
              <div>
                Someone invited you to join the InstantSplit group{" "}
                <strong>{groupData.group.groupName}</strong>.
              </div>
            </p>
            <p>
              InstantSplit is the hassle-free way to settle group expenses with{" "}
              <strong>no user registration or app download</strong> while
              sharing minimal data.
            </p>
            <p>
              To join <strong>{groupName}</strong>, and settle expenses
              immediately, simply accept this invitation.
            </p>
            <h2>Are you in?</h2>
            <button className={styles.button} onClick={handleAcceptInvitation}>
              Sure!
            </button>
          </>
        )}
      </div>
    </main>
  );
};
export default AcceptInviteAndJoinPage;
