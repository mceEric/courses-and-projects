import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import query from "./query";
import AddUser from "./AddUser";

function User() {
  const { data, loading } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <AddUser />
      <hr />
      {data.users.map(({ id, name, car }) => {
        return (
          <div className="center-content column" key={id}>
            {name}
            <div className="center-content row">
              {car.map((item) => {
                return <div key={item.id}> {item.make + " " + item.model}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default User;
