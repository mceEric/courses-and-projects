import React from "react";

function ContactForm() {
  return (
    <div className="max-w-[1240px] m-auto p-4 h-screen">
      <h1 className="text-2xl font-bold text-center p-4">Contact us now!</h1>
      <form className="max-w-[600px] m-auto">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            className="border shadow-lg p-3"
            placeholder="Name.."
          />
          <input
            type="email"
            className="border shadow-lg p-3"
            placeholder="Email..."
          />
        </div>
        <input
          type="text"
          className="border shadow-lg p-3 w-full my-2"
          placeholder="Subject..."
        />
        <textarea
          type="text"
          className="border shadow-lg p-3 w-full"
          rows="10"
          placeholder="Message..."
        />
        <button className="border shadow-lg p-3 w-full mt-2">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
