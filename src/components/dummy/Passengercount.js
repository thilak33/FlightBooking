import React, { useState } from "react";

const Passengercount = () => {
  const [adultCounter, setadultCounter] = useState(1);
  const [childCounter, setchildCounter] = useState(0);
  const [infantCounter, setinfantCounter] = useState(0);
  const [passCount, setPassCount] = useState(1);
  const [pclass, setPclass] = useState("Ecomony");
  const onChange = (e) => {
    if (e.target.checked) {
      setPclass(e.target.value);
    }
  };
  return (
    <>
      <div className="dropdown passengercount-con">
        <div className="dropdown-toggle pc-dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
          <div className="pc-placeholder">Passenger / Class</div>
          <div className="pc-displayvalue">
            {passCount} Passenger, {pclass}
          </div>
        </div>
        <div className="dropdown-menu pass-class-con">
          <div className="pass-detail-con">
            <div className="p-d-heading">Passenger</div>
            <div className="d-flex justify-content-between">
              <div className="p-holder">Adult (12years+)</div>
              <div className="d-flex counter-con">
                <div className="p-counter"
                  onClick={() => {
                    if (passCount > 1) {
                      setadultCounter((adultCounter) => adultCounter - 1);
                      setPassCount((passCount) => adultCounter + childCounter + infantCounter - 1);
                    }
                  }}> -
                </div>
                <div className="p-value p-a-value">{adultCounter}</div>
                <div className="p-counter"
                  onClick={() => {
                    if (passCount < 9) {
                      console.log(passCount);
                      setadultCounter((adultCounter) => adultCounter + 1);
                      setPassCount((passCount) => adultCounter + childCounter + infantCounter + 1);
                    }
                  }}>
                  +
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="p-holder">Child (2-11 years)</div>
              <div className="d-flex counter-con">
                <div className="p-counter"
                  onClick={() => {
                    if (passCount > 1) {
                      if (childCounter >= 1) {
                        setchildCounter((childCounter) => childCounter - 1);
                      }
                      setPassCount((passCount) => adultCounter + childCounter + infantCounter - 1);
                    }
                  }}>
                  -
                </div>
                <div className="p-value p-c-value">{childCounter}</div>
                <div
                  className="p-counter"
                  onClick={() => {
                    if (passCount < 9) {
                      setchildCounter((childCounter) => childCounter + 1);
                      setPassCount((passCount) => adultCounter + childCounter + infantCounter + 1);
                    }
                  }}>
                  +
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div className="p-holder">Infant (Under 2 years)</div>
              <div className="d-flex counter-con">
                <div className="p-counter"
                  onClick={() => {
                    if (passCount > 1) {
                      if (infantCounter >= 1) {
                        setinfantCounter((infantCounter) => infantCounter - 1);
                      }
                      setPassCount((passCount) => adultCounter + childCounter + infantCounter - 1
                      );
                    }
                  }}>
                  -
                </div>
                <div className="p-value p-i-value">{infantCounter}</div>
                <div className="p-counter"
                  onClick={() => {
                    if (passCount < 9) {
                      setinfantCounter((infantCounter) => infantCounter + 1);
                      setPassCount((passCount) => adultCounter + childCounter + infantCounter + 1
                      );
                    }
                  }}>
                  +
                </div>
              </div>
            </div>
            <div className="class-con">
              <div>
                <label htmlFor="ecomony">Ecomony</label>
                <input type="radio" onChange={onChange} id="ecomomy" name="classelection" value="Economy" checked />
                <label htmlFor="premeium">Premiuem</label>
                <input type="radio" onChange={onChange} id="premieum" name="classelection" value="Premiuem" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Passengercount;
