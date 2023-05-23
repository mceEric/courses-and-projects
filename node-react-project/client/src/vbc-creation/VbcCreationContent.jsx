function VbcCreationContent({
  usage,
  i,
  title,
  setTitle,
  description,
  setDescription,
}) {
  return (
    <div
      className="w-100 h-100 absolute border-box center-content column transition"
      style={{ transform: `translateX(${i * 100}%)` }}
    >
      <h2>
        Tell us a little about
        {usage === "Business" ? " your business." : " yourself."}
      </h2>
      <div className="center-content column">
        <input
          className="no-border border-box p-10 m-10 normal-font bottom-shadow"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            usage === "Business" ? "Company name..." : "Full name..."
          }
        />
        <textarea
          className="no-border border-box p-10 m-10 large-font bottom-shadow"
          style={{ minWidth: "24em" }}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={7}
          placeholder="Description..."
        />
      </div>
      <button className="tube-edges p-5 p-sides contrasting-primary content-outline pointer alt-content-outline">
        Generate VBC
      </button>
    </div>
  );
}

export default VbcCreationContent;
