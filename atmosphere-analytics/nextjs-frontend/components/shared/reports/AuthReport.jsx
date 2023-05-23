function AuthReport({ dataCy, report, error, extraClasses }) {

  return (
    <div
      data-cy={dataCy}
      className={`${extraClasses} w-full p-2 bg-transparent flex`}
    >
      <p className={`font-medium ${error ? "text-red-500" : "text-green-500"}`}>
        {report}
      </p>
    </div>
  );
}

export default AuthReport;
