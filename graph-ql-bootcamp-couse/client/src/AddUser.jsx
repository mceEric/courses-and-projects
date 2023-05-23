import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import query from "./query";

function AddUser() {
  const [name, setName] = useState("");

  const addUser = gql`
    mutation makeUser($name: String!) {
      makeUser(name: $name) {
        id
        name
        car {
          make
        }
      }
    }
  `;

  const [makeUser, { data, loading, error }] = useMutation(addUser, {
    refetchQueries: [],
  });

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  function handleSubmit(e) {
    e.preventDefault();
    makeUser({ variables: { type: name } });
    setName("");
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
        />
        <button>Add user</button>
      </form>
    </div>
  );
}

export default AddUser;
