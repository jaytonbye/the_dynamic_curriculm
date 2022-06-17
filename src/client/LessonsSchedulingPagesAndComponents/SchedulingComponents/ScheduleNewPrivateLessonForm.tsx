import * as React from "react";
import { useState, useEffect } from "react";
import * as scheduleLessonFunctions from "../ServicesForPrivateLessonScheduling/privateLessonScheduleFuncs";
import * as dateTimeValues from "../ServicesForPrivateLessonScheduling/dateTimeValues";
import DropDownForMovesAndWrestlers from "../../DropDownForMovesAndWrestlers";

const ScheduleNewPrivateLessonForm = (props: IProps) => {
  ///DROPDOWN START 1/3
  let [displayDropDown, setDisplayDropDown] = React.useState(false);
  let [dropDownInputValue, setDropDownInputValue] = React.useState("");
  let wrapperRef = React.useRef(null); //this closes autocomplete list when mouse clicks off of it
  ///DROP END
  let hourArray: number[] = dateTimeValues.hourArrayValues;
  let minuteArray: Array<number | string> = dateTimeValues.minuteArrayValues;
  let token = localStorage.getItem("token");
  let [personal_info, setPersonalInfo] = useState<Array<any>>([]);
  let [coaches_UID, setCoaches_UID] = useState<number>(); // not inputed
  let [wrestlerId, setWrestlerId] = useState<number>();
  let [lessonStartDate, setLessonStartDate] = useState<string>();
  let [lessonStartTime, setLessonStartTime] = useState<string>();
  let [durationHours, setDurationHours] = useState<number | string>(1);
  let [durationMinutes, setDurationMinutes] = useState<number | string>("00");
  let [seriesEndDate, setSeriesEndDate] = useState<string>();
  let [wieght, setWeight] = useState<string>("N/A");
  let [age, setAge] = useState<string>("N/A");
  let [war, setWar] = useState<string>("N/A");

  //gets all of the user_profiles for proper tenant - this gets everyone, wrestlers, coaches and admin, not my code just copied and pasted
  useEffect(() => {
    fetch(`/api/schedulingLessons/validateToketInputAvailability`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setCoaches_UID(res.userId);
        fetch(`/api/personal_info/${res.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((results) => {
            setPersonalInfo(results);
          });
      });
  }, []);

  //DROPDOWN START 2/3
  // React.useEffect(() => {
  //   for (let x = 0; x < personal_info.length; x++) {
  //     if (personal_info[x].id === Number(wrestlerId)) {
  //       setSearchedMoveObject(personal_info[x]);
  //     }
  //   }
  // }, [wrestlerId]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickedOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickedOutsideDropdown);
    };
  }, []);

  let handleClickedOutsideDropdown = (e: any) => {
    let { current: wrap }: any = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplayDropDown(false);
    }
  };
  //DROPDOWN END

  // const onWrestlerChange = (event: any) => { //used this to set state of text that is visible in the html .. not needed if dropdown only sets state
  //   let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
  //   let wrestlerIdAfterSlice = event.target.value.slice(
  //     whereToSliceFrom,
  //     event.target.value.length
  //   );
  //   setWrestlerId(Number(wrestlerIdAfterSlice));
  // };

  let handleSubmitLessonPlan = (e: any) => {
    e.preventDefault();
    let submitResultResult = scheduleLessonFunctions.submitPrivateLessonFunc(
      coaches_UID,
      wrestlerId,
      lessonStartDate,
      lessonStartTime,
      durationHours,
      durationMinutes,
      seriesEndDate,
      wieght,
      age,
      war,
      props.funcFromStartPageToRenderComp
    );
  };

  return (
    <div className="">
      <div className="m-auto p-0 d-flex flex-wrap card col-12 col-md-10">
        <div className="d-flex col-12 justify-content-center">
          <div className="mt-1 d-flex justify-content-center flex-wrap">
            <div className="d-flex justify-content-center flex-wrap col-8">
              <h3 className="text-center mb-5">
                <u>Schedule a new lesson or series</u>
                <br />
              </h3>
            </div>

            {/* ///DROPDOWN START 3/3*/}
            <div className="d-flex flex wrap justify-content-center col-11">
              <div
                style={{ width: "400px" }}
                className="d-flex flex-wrap justify-content-center align-items-center col-11"
              >
                <label className="h4 p-0 text-center">Select a wrestler:</label>
                <div ref={wrapperRef}>
                  <DropDownForMovesAndWrestlers
                    // first select if drop is for moves or people
                    isMovesList={false}
                    isPersonList={true}
                    // fill in proper values for dropdown
                    dropDownInputValue={dropDownInputValue}
                    setDropDownInputValue={setDropDownInputValue}
                    displayDropDown={displayDropDown}
                    setDisplayDropDown={setDisplayDropDown}
                    // If for moves fill proper values. else make these null
                    videosByTenant={null}
                    setSearchedMoveId={null}
                    // If for people fill proper values. else make these null
                    personal_info={personal_info} //list of people
                    setWrestlerId={setWrestlerId}
                  />
                </div>
              </div>
            </div>
            {/* DROPDOWN END  */}

            {/* <div className="d-flex flex-wrap justify-content-center">
              <label className="h4 text-center">Select a wrestler: </label>
              <input
                className="col-12"
                type="text"
                list="wrestler1List"
                onChange={onWrestlerChange}
              />
              <datalist id="wrestler1List">
                {personal_info.map((wrestler) => {
                  return (
                    <option
                      key={wrestler.user_id}
                      value={
                        wrestler.first_name +
                        " " +
                        wrestler.last_name +
                        " -+- " +
                        String(wrestler.user_id)
                      }
                    ></option>
                  );
                })}
              </datalist>
            </div> */}
          </div>
        </div>

        <div className="">
          <div className="d-flex flex-wrap justify-content-center align-items-center mt-3 mb-3">
            <h5 className="mr-2">Date:</h5>
            <input
              onChange={(e: any) => setLessonStartDate(e.target.value)}
              type="date"
              id="birthday"
              name="birthday"
            />
          </div>

          <div className="d-flex flex-wrap justify-content-center align-itmes-center mt-3 mb-3">
            <h5 className="mr-2">start time:</h5>
            <input
              onChange={(e: any) => setLessonStartTime(e.target.value)}
              type="time"
              id="appt"
              name="appt"
            />
          </div>

          <div className="d-flex flex-wrap justify-content-center align-itmes-center mt-3 mb-3">
            <h5 className="mr-2">Duration:</h5>
            <select
              onChange={(e) => setDurationHours(e.target.value)}
              defaultValue="1"
            >
              {hourArray.map((hour) => {
                return (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(e) => setDurationMinutes(e.target.value)}
              defaultValue="00"
            >
              {minuteArray.map((minute) => {
                return (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <div className="d-flex flex-wrap justify-content-center align-items-center mt-3 mb-3 text-center">
              <h5 className="mr-2">
                series end date <small> (optional)</small>:
                <br />
                <small style={{ fontSize: "10px" }}>
                  select an end date if you would like lesson
                  <br />
                  to reccur weekly on the same day & time
                </small>
              </h5>
              <input
                onChange={(e: any) => setSeriesEndDate(e.target.value)}
                type="date"
                id="birthday"
                name="birthday"
              />
            </div>
          </div>

          <div className=" d-flex justify-content-center flex-wrap">
            <h5 className="text-center">Wreslter info (optional):</h5>
            <div className="col-9 w-75 d-flex flex-wrap col-sm-12 justify-content-center p-0">
              <div className="m-1">
                <input
                  className="col-12"
                  placeholder="Weight"
                  maxLength={15}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </div>
              <div className="m-1">
                <input
                  className="col-12"
                  placeholder="Age"
                  maxLength={15}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              <div className="m-1">
                <input
                  className="col-12"
                  placeholder="WAR"
                  maxLength={15}
                  onChange={(e) => {
                    setWar(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 mb-3 d-flex justify-content-center">
            <button
              onClick={handleSubmitLessonPlan}
              className="btn btn-success"
            >
              Submit Lesson
            </button>
          </div>
        </div>

        <div></div>
      </div>
      <hr style={{ height: "2px", backgroundColor: "black" }} />
    </div>
  );
};

export default ScheduleNewPrivateLessonForm;

interface IProps {
  funcFromStartPageToRenderComp: Function;
}

// hovering over lables are triggering re render of component ???
