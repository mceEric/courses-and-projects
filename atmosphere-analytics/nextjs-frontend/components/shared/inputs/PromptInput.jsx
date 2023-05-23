import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

function PromptInput({
  type,
  placeholder,
  value,
  handleChange,
  prompt,
  signup,
  isSignup,
  passwordValidator,
  dataCy,
}) {
  const isDisplayed = signup === false || signup === isSignup;

  return (
    isDisplayed && (
      <div className="center-content flex-col p-2">
        <div className="self-start center-content flex-row">
          <p className="text-sm text-violet-300 font-medium py-2 self-start">
            {prompt}
          </p>
          {type === "password" && value !== "" && (
            <div
              data-cy="item-password-error"
              className="flex selft-start flex-row p-2"
            >
              {passwordValidator(value) ? (
                <XCircleIcon className={`h-4 w-4 text-red-600 mr-[0.25em]`} />
              ) : (
                <CheckCircleIcon
                  className={`h-4 w-4 text-green-600 mr-[0.25em]`}
                />
              )}

              <p className="text-sm text-gray-600 font-medium">
                {passwordValidator(value)}
              </p>
            </div>
          )}
        </div>
        <input
          placeholder={placeholder}
          data-cy={dataCy}
          type={type}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full shadow-md p-4 rounded-md border-[1px] outline-none"
        ></input>
      </div>
    )
  );
}

export default PromptInput;
