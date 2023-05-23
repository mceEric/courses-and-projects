import React, { useState } from "react";
import ChangeItemButtons from "./ChangeItemButtons";
import CreationItems from "./CreationItems";
import ProgressBar from "./ProgressBar";

function CreateVbc() {
  const [transform, setTransform] = useState(0);
  const [usage, setUsage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="w-100 h-100 center-content gradient-bg column">
      <ProgressBar transform={transform} />
      <div className="w-100 h-100 center-content">
        <ChangeItemButtons
          transform={transform}
          usage={usage}
          setTransform={setTransform}
        />
        <div
          className="w-100 h-100 center-content row relative transition"
          style={{ transform: `translateX(${transform * -100}%)` }}
        >
          <CreationItems
            usage={usage}
            setUsage={setUsage}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateVbc;
