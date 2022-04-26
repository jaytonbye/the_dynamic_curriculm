import * as React from 'react';
import NavigationBar from '../NavigationBar';
import CreatePlan from './CreatePlan';
import ViewPlans from './ViewPlans';

const CreateAndEditPlan = () => {

  const [buttonToCreateOrView, setButtonToCreateOrView] = React.useState('Create A Lesson Plan')
  const [showOrHideCreateLessonPlan, setshowOrHideCreateLessonPlan] = React.useState(
    false
  );
  const [showOrHideAllPlans, setShowOrHideAllPlans] = React.useState(
    true
  );
  // const [showOrHideItem, setShowOrHideItem] = React.useState(
  //   false
  // );

  const showOrHideCreateLessonPlanFunc = () => {
    if(buttonToCreateOrView === 'Create A Lesson Plan'){
      setshowOrHideCreateLessonPlan(!showOrHideCreateLessonPlan);
      setShowOrHideAllPlans(false)
      setButtonToCreateOrView('View All your Plans')
    }else{
      setShowOrHideAllPlans(!showOrHideAllPlans);
      setshowOrHideCreateLessonPlan(false)
      setButtonToCreateOrView('Create A Lesson Plan')

    }
  };

  // const showOrHideAllPlansFunc = () => {
  //   setShowOrHideAllPlans(!showOrHideAllPlans);
  //   setshowOrHideCreateLessonPlan(false)
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
        <button className="btn btn-success ml-2" onClick={showOrHideCreateLessonPlanFunc}>
          {buttonToCreateOrView}
        </button>
        {/* <button
          className="btn btn-warning"
          onClick={showOrHideAllPlansFunc}
        >
          View All your Plans
        </button> */}
      </div>
      {showOrHideCreateLessonPlan && <CreatePlan />}
      {showOrHideAllPlans && <ViewPlans />} 
    </>
    )
}

export default CreateAndEditPlan;