import React from "react";
import ContactForm from "../components/contact/ContactForm";
import Hero from "../components/Hero";

function contact() {
  const heading = "Contact us";
  const message = "Please contact us by submiting the form below.";
  return (
    <div>
      <Hero heading={heading} message={message} />
      <ContactForm />
    </div>
  );
}

export default contact;
