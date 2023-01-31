function validateForm() {
  const nameInput = document.getElementById("name");
  const peselInput = document.getElementById("pesel");
  const zaszczepionyInput = document.getElementById("zaszczepiony");

  const reqMessage = document.getElementById('errorMessage-required').innerText;
    const reqMessageNumber = document.getElementById('errorMessage-requiredNumber').innerText;
    const reqMessageRange = document.getElementById('errorMessage-requiredRange').innerText;
    const reqMessageRangePesel = document.getElementById('errorMessage-requiredRangePesel').innerText;
    const reqMessageSummary = document.getElementById('errorMessage-requiredSummary').innerText;
    

  const errorName = document.getElementById("errorName");
  const errorZaszczepiony = document.getElementById("errorZaszczepiony");
  const errorPesel = document.getElementById("errorPesel");

  const errorsSummary = document.getElementById("errorsSummary");

  resetErrors(
    [nameInput, peselInput, zaszczepionyInput],
    [errorName, errorZaszczepiony, errorPesel],
    [errorsSummary]
  );

  let valid = true;

  if (!checkRequired(nameInput.value)) {
    valid = false;
    nameInput.classList.add("error-input");
    errorName.innerText = reqMessage;
  } else if (!checkTextLengthRange(nameInput.value, 2, 20)) {
    valid = false;
    nameInput.classList.add("error-input");
    errorName.innerText = reqMessageRange;
  }

  // if (!checkRequired(zaszczepionyInput.value)) {
  //   valid = false;
  //   zaszczepionyInput.classList.add("error-input");
  //   errorZaszczepiony.innerText = "Pole jest wymagane";
  // }

  if (!checkRequired(peselInput.value)) {
    valid = false;
    peselInput.classList.add("error-input");
    errorPesel.innerText = reqMessage;
  } else if (!checkNumber(peselInput.value)) {
    valid = false;
    peselInput.classList.add("error-input");
    errorPesel.innerText = reqMessageNumber;
  }else if (!checkTextLengthRange(peselInput.value, 11, 11)) {
    valid = false;
    peselInput.classList.add("error-input");
    errorPesel.innerText = reqMessageRangePesel;
  }

  if (!valid) {
    errorsSummary.innerText = reqMessageSummary;
  }

  return valid;
}
