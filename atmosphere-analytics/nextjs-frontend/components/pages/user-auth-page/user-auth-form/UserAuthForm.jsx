import { useEffect } from "react";
import getColors from "../../../../utils/getColor";
import StandardButton from "../../../shared/buttons/StandardButton";
import PromptInput from "../../../shared/inputs/PromptInput";

function UserAuthForm({ inputs, isSignup, handleSubmit }) {
  const buttonPrompt = isSignup ? "Get Started" : "Log in";

  function checkUppercasePresence(string) {
    return string == string.toLowerCase() && string != string.toUpperCase();
  }

  const isTest = getColors(true);

  // Validates that a password input is certified for submission
  function passwordValidator(password) {
    var specialCharacterFormat = /[ `!@£#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (checkUppercasePresence(password)) {
      return "Password requires at least one uppercase character";
    } else if (password.match(/\d+/g) === null) {
      return "Password requires at least one digit character";
    } else if (!specialCharacterFormat.test(password)) {
      return "Password requires at least one special character";
    } else if (password.length < 8) {
      return "Password length must be 8 characters or more";
    }
    return false;
  }

  // Determines whether the button can be clicked or not
  function buttonAllowance() {
    for (var i = 0; i < inputs.length; isSignup ? i++ : (i += 3)) {
      if (inputs[i].value === "") {
        return false;
      }
    }
    if (passwordValidator(inputs[3].value) === false) {
      return true;
    }
    return false;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full h-full flex-col">
      <div className="w-full flex flex-col mb-4">
        {inputs.map((input) => {
          return (
            <PromptInput
              key={input.prompt}
              dataCy={input.dataCy}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              handleChange={input.setValue}
              prompt={input.prompt}
              signup={input.signup}
              isSignup={isSignup}
              passwordValidator={passwordValidator}
            />
          );
        })}
      </div>
      <StandardButton
        message={buttonPrompt}
        dataCy={"button-user-auth"}
        buttonAllowance={buttonAllowance}
        extraClasses={`w-full`}
        colors={getColors(isTest && false)}
      />
    </form>
  );
}

export default UserAuthForm;
