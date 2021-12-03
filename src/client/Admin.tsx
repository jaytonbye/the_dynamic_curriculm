import React from "react";
import NavigationBar from "./NavigationBar";
import CreateAccountForTennancyModel from "./CreateAccountForTennancyModel";
import VideoManager from "./VideoManager";

function Admin() {
  const [showOrHideCreateAccount, setShowOrHideCreateAccount] = React.useState(
    false
  );
  const [showOrHideVideoManager, setShowOrHideVideoManager] = React.useState(
    false
  );

  const showOrHideAccountCreation = () => {
    setShowOrHideCreateAccount(!showOrHideCreateAccount);
  };

  const showOrHideVideoManagerFunction = () => {
    setShowOrHideVideoManager(!showOrHideVideoManager);
  };

  return (
    <>
      <NavigationBar />
      <button className="btn btn-success" onClick={showOrHideAccountCreation}>
        Click here to show/hide add wrestler panel
      </button>
      <button
        className="btn btn-warning"
        onClick={showOrHideVideoManagerFunction}
      >
        Click here to show/hide Video Manager
      </button>
      {showOrHideCreateAccount && <CreateAccountForTennancyModel />}
      {showOrHideVideoManager && <VideoManager />}
    </>
  );
}

export default Admin;
