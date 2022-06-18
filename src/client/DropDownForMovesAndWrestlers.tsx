import * as React from "react";

const DropDownForMovesAndWrestlers = (props: IProps) => {
  if (props.isMovesList) {
    return (
      <div className="d-flex justify-content-center">
        <input
          style={{ maxWidth: "200px" }}
          type="text"
          onClick={() => {
            !props.dropDownInputValue
              ? props.setDisplayDropDown(true)
              : props.setDisplayDropDown(false);
          }}
          value={props.dropDownInputValue}
          onChange={(event: any) => {
            props.setDropDownInputValue(event.target.value);
            props.setDisplayDropDown(true);
          }}
        />
        {props.displayDropDown && (
          <div
            className="auto-container"
            style={{
              marginTop:"40px",
              padding:"5px",
              whiteSpace: "nowrap",
              backgroundColor: "white",
              width: "80%",
              maxWidth: "500px",
              maxHeight: "300px",
              overflow: "scroll",
              position: "absolute",
              zIndex: 1,
            }}
          >
            {props.videosByTenant
              .filter(
                ({ name_of_video }: any) =>
                  name_of_video
                    .toLowerCase()
                    .indexOf(props.dropDownInputValue.toLowerCase()) > -1
              )
              .map((move: any) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.setDropDownInputValue(move.name_of_video);
                      props.setSearchedMoveId(move.id);
                      props.setDisplayDropDown(false);
                    }}
                    key={move.id}
                    tabIndex={0}
                  >
                    <span>{move.name_of_video}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <input
          style={{ maxWidth: "200px" }}
          type="text"
          onClick={() => {
            !props.dropDownInputValue
              ? props.setDisplayDropDown(true)
              : props.setDisplayDropDown(false);
          }}
          value={props.dropDownInputValue}
          onChange={(event: any) => {
            props.setDropDownInputValue(event.target.value);
            props.setDisplayDropDown(true);
          }}
        />
        {props.displayDropDown && (
          <div
            className="auto-container"
            style={{
              whiteSpace: "nowrap",
              backgroundColor: "white",
              maxWidth: "200px",
              maxHeight: "190px",
              overflow: "scroll",
              position: "absolute",
              zIndex: 1,
            }}
          >
            {props.personal_info
              .filter(
                ({ first_name, last_name }: any) =>
                  `${first_name} ${last_name}`
                    .toLowerCase()
                    .indexOf(props.dropDownInputValue.toLowerCase()) > -1
              )
              .map((wrestler: any) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.setDropDownInputValue(
                        `${wrestler.first_name} ${wrestler.last_name}`
                      );
                      props.setWrestlerId(wrestler.user_id);
                      props.setDisplayDropDown(false);
                    }}
                    key={wrestler.user_id}
                    tabIndex={0}
                  >
                    <span>
                      {wrestler.first_name} {wrestler.last_name}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
};

export default DropDownForMovesAndWrestlers;

interface IProps {
  isMovesList: boolean;
  isPersonList: boolean;
  dropDownInputValue: boolean | any;
  setDisplayDropDown: any;
  setDropDownInputValue: any;
  displayDropDown: any;
  videosByTenant: any;
  setSearchedMoveId: any;
  personal_info: any;
  setWrestlerId: any;
}



///////////////             DONT FOR TO ADD THIS WITH COMPONENT

  ///DROPDOWN START 1/3
//   let [displayDropDown, setDisplayDropDown] = React.useState(false);
//   let [dropDownInputValue, setDropDownInputValue] = React.useState("");
//   let wrapperRef = React.useRef(null); //this closes autocomplete list when mouse clicks off of it
  ///DROP END

  //DROPDOWN START 2/3
//    {{                                        could start with this commented out
//   React.useEffect(() => {
//     for (let x = 0; x < videosByTenant.length; x++) {
//       if (videosByTenant[x].id === Number(searchedMoveId)) {
//         setSearchedMoveObject(videosByTenant[x]);
//       }
//     }
//   }, [searchedMoveId]);
// }}

//   React.useEffect(() => {
//     document.addEventListener("mousedown", handleClickedOutsideDropdown);

//     return () => {
//       document.removeEventListener("mousedown", handleClickedOutsideDropdown);
//     };
//   }, []);

//   let handleClickedOutsideDropdown = (e: any) => {
//     let { current: wrap } = wrapperRef;
//     if (wrap && !wrap.contains(e.target)) {
//       setDisplayDropDown(false);
//     }
//   };
  //DROPDOWN END

  // DROPDOWN 3/3 is importing this component