import * as React from 'react';
import NavigationBar from '../NavigationBar';
import CreatePlan from './CreatePlan';
import ViewPlans from './ViewPlans';

const CreateAndEditPlan = () => {

  const [showOrHideCreateLessonPlan, setshowOrHideCreateLessonPlan] = React.useState(
    false
  );
  const [showOrHideAllPlans, setShowOrHideAllPlans] = React.useState(
    false
  );
  // const [showOrHideItem, setShowOrHideItem] = React.useState(
  //   false
  // );

  const showOrHideCreateLessonPlanFunc = () => {
    setshowOrHideCreateLessonPlan(!showOrHideCreateLessonPlan);
    setShowOrHideAllPlans(false)
    // setShowOrHideItem(false)
  };

  const showOrHideAllPlansFunc = () => {
    setShowOrHideAllPlans(!showOrHideAllPlans);
    setshowOrHideCreateLessonPlan(false)
    // setShowOrHideItem(false)
  };
  // const showOrHideItemCreation = () => {
  //   setShowOrHideItem(!showOrHideItem);
  //   setShowOrHideCreateAccount(false)
  //   setShowOrHideVideoManager(false)
  // };
  
    return(
        <>
      <NavigationBar />
      <div className="d-flex justify-content-between">
        <button className="btn btn-success ml-2" onClick={showOrHideCreateLessonPlanFunc}>
          Create A Lesson Plan
        </button>
        <button
          className="btn btn-warning"
          onClick={showOrHideAllPlansFunc}
        >
          View All your Plans
        </button>
        {/* <button
          className="btn btn-secondary mr-2"
          // onClick={showOrHideItemCreation}
        >
          Click here to show/hide add item panel
        </button> */}
      </div>
      {showOrHideCreateLessonPlan && <CreatePlan />}
      {showOrHideAllPlans && <ViewPlans />} 
      {/* {showOrHideVideoManager && <VideoManager />} */}
      {/* {showOrHideItem && <AddItemAdminPage />} */}
    </>
    )
}

export default CreateAndEditPlan;