import * as React from "react";
import { useState, useEffect } from "react";

const PhoneNumberForm = (props: IProps) => {
  let [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    fetch(`/api/schedulingLessons/getPhoneNumberByUserId/${props.userId}`)
      .then((res) => res.json())
      .then((res) => setPhoneNumber(res[0].phone_number));
  }, [props.userId]);

  let submitNumber = () => {
    if (!phoneNumber) {
      alert("invalid phone number");
      return;
    } else {
      fetch(
        `/api/schedulingLessons/addPhoneNumber/${phoneNumber}/${props.userId}`,
        { method: "PUT" }
      ).then((res) => {
        if (res.ok) {
          alert("Your phone number has been updated successfully");
        } else {
          alert("Something went wrong. Unable to update phone number");
        }
      });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-2 mb-2 pt-3 pb-3">
        <div className="card text-center col-md-7 col-12">
          <div className="card-body p-2">
            <h3 className="">Add or edit phone number</h3>
            <div className="d-flex justify-content-center flex-wrap">
              <div className="col-12">
                <input
                  className="col-md-7"
                  onChange={(e: any) => setPhoneNumber(e.target.value)}
                  type="text"
                  defaultValue={phoneNumber}
                />
              </div>
              <div className="col-12">
                <button onClick={submitNumber} className="btn-success">
                  submit number
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ height: "2px", backgroundColor: "black" }} />
    </div>
  );
};

export default PhoneNumberForm;

interface IProps {
  userId: number | string | any;
}
