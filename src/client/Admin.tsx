import React from "react";
import NavigationBar from "./NavigationBar";
import CreateAccountForTennancyModel from "./CreateAccountForTennancyModel";
import VideoManager from "./VideoManager";
import AddItemAdminPage from './addItemAdminPage';
;


function Admin() {
  const [showOrHideCreateAccount, setShowOrHideCreateAccount] = React.useState(
    false
  );
  const [showOrHideVideoManager, setShowOrHideVideoManager] = React.useState(
    false
  );
  const [showOrHideItem, setShowOrHideItem] = React.useState(
    false
  );

  const showOrHideAccountCreation = () => {
    setShowOrHideCreateAccount(!showOrHideCreateAccount);
    setShowOrHideVideoManager(false)
    setShowOrHideItem(false)
  };

  const showOrHideVideoManagerFunction = () => {
    setShowOrHideVideoManager(!showOrHideVideoManager);
    setShowOrHideCreateAccount(false)
    setShowOrHideItem(false)
  };
  const showOrHideItemCreation = () => {
    setShowOrHideItem(!showOrHideItem);
    setShowOrHideCreateAccount(false)
    setShowOrHideVideoManager(false)
  };

  return (
    <>
      <NavigationBar />
      <div className="d-flex justify-content-between">
        <button className="btn btn-success ml-2" onClick={showOrHideAccountCreation}>
          Click here to show/hide add wrestler panel
        </button>
        <button
          className="btn btn-warning"
          onClick={showOrHideVideoManagerFunction}
        >
          Click here to show/hide Video Manager
        </button>
        <button
          className="btn btn-secondary mr-2"
          onClick={showOrHideItemCreation}
        >
          Click here to show/hide add item panel
        </button>
      </div>
      {showOrHideCreateAccount && <CreateAccountForTennancyModel />}
      {showOrHideVideoManager && <VideoManager />}
      {showOrHideItem && <AddItemAdminPage />}
    </>
  );
}

export default Admin;
