import React, { useState } from "react";
import CreateUserForm from "../../components/containerComponents/CreateUserForm/CreateUserForm";
import RenderUserNames from "../../components/containerComponents/RenderUserNames/RenderUserNames";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

function CreateUsersDuringSignUpPage() {
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Add user' />
      <NavigateButton
        route={"groupcode-explanation"}
        buttonText={faRightLong}
        alignment={"right"}
        isIcon={true}
      />
      <CreateUserForm toggleDataRefresh={toggleDataRefresh} />
      <RenderUserNames refreshData={refreshData} />
    </main>
  );
}

export default CreateUsersDuringSignUpPage;
