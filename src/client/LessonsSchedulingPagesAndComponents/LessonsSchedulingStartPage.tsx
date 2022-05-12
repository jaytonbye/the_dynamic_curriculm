import * as React from "react";
import { Link, useParams } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import CoachesAvailabilityForm from "./SchedulingComponents/CoachesAvailabilityForm";

const LessonsSchedulingStartPage = () => {
  return (
    <div>
      <CoachesAvailabilityForm />
    </div>
  );
};

export default LessonsSchedulingStartPage;
