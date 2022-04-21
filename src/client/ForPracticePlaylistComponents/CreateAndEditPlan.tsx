import * as React from 'react';
import NavigationBar from '../NavigationBar';
import CreatePlan from './CreatePlan';

const CreateAndEditPlan = () => {

  const [showOrHideCreateLessonPlan, setshowOrHideCreateLessonPlan] = React.useState(
    false
  );
  const [showOrHideVideoManager, setShowOrHideVideoManager] = React.useState(
    false
  );
  const [showOrHideItem, setShowOrHideItem] = React.useState(
    false
  );

  const showOrHideCreateLessonPlanFunc = () => {
    setshowOrHideCreateLessonPlan(!showOrHideCreateLessonPlan);
    setShowOrHideVideoManager(false)
    setShowOrHideItem(false)
  };

  // const showOrHideVideoManagerFunction = () => {
  //   setShowOrHideVideoManager(!showOrHideVideoManager);
  //   setShowOrHideCreateAccount(false)
  //   setShowOrHideItem(false)
  // };
  // const showOrHideItemCreation = () => {
  //   setShowOrHideItem(!showOrHideItem);
  //   setShowOrHideCreateAccount(false)
  //   setShowOrHideVideoManager(false)
  // };
  
    return(
        <>
      <NavigationBar />
      <div className="d-flex justify-content-between">
        <button className="btn btn-danger ml-2" onClick={showOrHideCreateLessonPlanFunc}>
          Create A Lesson Plan
        </button>
        <button
          className="btn btn-danger"
          // onClick={showOrHideVideoManagerFunction}
        >
          Click here to show/hide Video Manager
        </button>
        <button
          className="btn btn-secondary mr-2"
          // onClick={showOrHideItemCreation}
        >
          Click here to show/hide add item panel
        </button>
      </div>
      {showOrHideCreateLessonPlan && <CreatePlan />}
       {/* {showOrHideCreateLessonPlan && <CreateAccountForTennancyModel />} }
      {showOrHideVideoManager && <VideoManager />}
      {showOrHideItem && <AddItemAdminPage />} */}
    </>
    )
}

export default CreateAndEditPlan;