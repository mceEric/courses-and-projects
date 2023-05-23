function FormSwitch({ question, prompt, onClick }) {
  return (
    <div className="mt-10 pb-10 center-content">
      <p className="normal-font">{question}</p>
      <p
        onClick={onClick}
        className="pl-3 transparent-bg p-0 no-border pointer contrasting-primary normal-font"
      >
        {prompt}
      </p>
    </div>
  );
}

export default FormSwitch;
