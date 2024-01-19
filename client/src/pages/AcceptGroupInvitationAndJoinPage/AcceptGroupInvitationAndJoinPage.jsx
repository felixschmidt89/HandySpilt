// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import AcceptGroupInvitation from "../../components/features/AcceptGroupInvitationAndJoinGroup/AcceptGroupInvitation/AcceptGroupInvitation";
import ShowTermsAndConditions from "../../components/features/AcceptGroupInvitationAndJoinGroup/ShowTermsAndConditions/ShowTermsAndConditions";

// Styles
import styles from "./AcceptGroupInvitationAndJoinPage.module.css";
import InvitationIntro from "../../components/features/AcceptGroupInvitationAndJoinGroup/InvitationIntro/InvitationIntro";
import InstantSplitIntroSection from "../../components/features/Home/InstantSplitIntroSection/InstantSplitIntroSection";

const AcceptGroupInvitationAndJoinPage = () => {
  const { groupCode, groupName } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`Invitation to join ${groupName}`}
        description={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
      />
      <PiratePx
        COUNT_IDENTIFIER={"accept-invitation-and-join-instantsplit-group"}
      />
      {!isFetched ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h1>Hi there!</h1>
          <InvitationIntro groupData={groupData} />
          <InstantSplitIntroSection />
          <AcceptGroupInvitation groupName={groupName} groupCode={groupCode} />
          <ShowTermsAndConditions />
        </div>
      )}
    </main>
  );
};

export default AcceptGroupInvitationAndJoinPage;
