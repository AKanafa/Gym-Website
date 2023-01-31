function validateForm() {
  const adresInput = document.getElementById("nazwa");
  const iloscTrenerowInput = document.getElementById("iloscTrenerow");
  const iloscDostepnychMaszynInput = document.getElementById("iloscMaszyn");

  const reqMessage = document.getElementById('errorMessage-required').innerText;
    const reqMessageRangeNumber = document.getElementById('errorMessage-requiredRangeNumber').innerText;
    const reqMessageRange = document.getElementById('errorMessage-requiredRange').innerText;
    const reqMessageSummary = document.getElementById('errorMessage-requiredSummary').innerText;
    const reqMessageNumber = document.getElementById('errorMessage-requiredNumber').innerText;

  const errorNazwa = document.getElementById("errorNazwa");
  const errorIloscTrenerow = document.getElementById("errorIloscTrenerow");
  const errorDostepnychMaszyn = document.getElementById("errorDostepnychMaszyn");

  const errorsSummary = document.getElementById("errorsSummary");

  resetErrors(
    [adresInput, iloscTrenerowInput, iloscDostepnychMaszynInput],
    [errorNazwa, errorIloscTrenerow, errorDostepnychMaszyn],
    [errorsSummary]
  );

  let valid = true;

  if (!checkRequired(adresInput.value)) {
    valid = false;
    adresInput.classList.add("error-input");
    errorNazwa.innerText = reqMessage;
  } else if (!checkTextLengthRange(adresInput.value, 2, 20)) {
    valid = false;
    adresInput.classList.add("error-input");
    errorNazwa.innerText = reqMessageRange;
  }

  let nowDate = new Date(),
    month = "" + (nowDate.getMonth() + 1);
  (day = "" + nowDate.getDate()), (year = nowDate.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  const nowString = [year, month, day].join("-");

  if (!checkRequired(iloscDostepnychMaszynInput.value)) {
    valid = false;
    iloscDostepnychMaszynInput.classList.add("error-input");
    errorDostepnychMaszyn.innerText = reqMessage;
  } else if (!checkNumber(iloscDostepnychMaszynInput.value)) {
    valid = false;
    iloscDostepnychMaszynInput.classList.add("error-input");
    errorDostepnychMaszyn.innerText = reqMessageNumber;
  } else if (!checkNumberRange(iloscDostepnychMaszynInput.value, 1,1000)) {
    valid = false;
    iloscDostepnychMaszynInput.classList.add("error-input");
    errorDostepnychMaszyn.innerText = reqMessageRangeNumber;
  }

  if (!checkRequired(iloscTrenerowInput.value)) {
    valid = false;
    iloscTrenerowInput.classList.add("error-input");
    errorIloscTrenerow.innerText = reqMessage;
  } else if (!checkNumber(iloscTrenerowInput.value)) {
    valid = false;
    iloscTrenerowInput.classList.add("error-input");
    errorIloscTrenerow.innerText = reqMessageNumber;
  } else if (!checkNumberRange(iloscTrenerowInput.value, 1,1000)) {
    valid = false;
    iloscTrenerowInput.classList.add("error-input");
    errorIloscTrenerow.innerText = reqMessageRangeNumber;
  }

  if (!valid) {
    errorsSummary.innerText = reqMessageSummary;
  }

  return valid;
}
