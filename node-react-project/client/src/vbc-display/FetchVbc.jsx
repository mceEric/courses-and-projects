import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NoVbcDisplay from "./NoVbcDisplay";
import VbcDisplay from "./VbcDisplay";

function FetchVbc() {
  const [validate, setValidate] = useState(false);
  const { vbcId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/vbc/${vbcId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setValidate(res);
      })
      .catch((error) => {
        console.log(error);
        setValidate(false);
      });
  }, []);

  return validate.title ? <VbcDisplay content={validate} /> : <NoVbcDisplay />;
}

export default FetchVbc;
