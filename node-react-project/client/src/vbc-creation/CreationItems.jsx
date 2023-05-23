import React from "react";
import VbcCreationContent from "./VbcCreationContent";
import VbcUsage from "./VbcUsage";

function CreationItems({
  usage,
  setUsage,
  title,
  setTitle,
  description,
  setDescription,
}) {
  function handleClick(e) {
    e.preventDefault();
    setUsage(e.target.value);
  }

  return (
    <div className="w-100 h-100">
      <VbcUsage usage={usage} i={0} handleClick={handleClick} />
      <VbcCreationContent
        usage={usage}
        i={1}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
}

export default CreationItems;
