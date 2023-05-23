import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function FormInput({ icon, placeholder, type, value, displayed }) {
  const [focus, setFocus] = useState(false);
  return (
    displayed && (
      <div className="center-content m-10" style={{ width: "60%" }}>
        <div
          className={`tube-edges-l center-content white ${
            !focus ? "component-gradient" : "alt-component-gradient"
          }`}
          style={{ minWidth: "3em", height: "100%" }}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
        <input
          required
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="no-border border-box p-10 ml-5 h-100 flex-fill normal-font bottom-shadow tube-edges-r white-bg"
          placeholder={placeholder}
          type={type}
          onChange={(e) => value(e.target.value)}
        />
      </div>
    )
  );
}

export default FormInput;
