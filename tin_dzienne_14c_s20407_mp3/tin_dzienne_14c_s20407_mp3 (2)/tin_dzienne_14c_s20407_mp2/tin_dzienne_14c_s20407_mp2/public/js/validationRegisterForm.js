function validateForm() {
  const clientInput = document.getElementById("client");
  const locationInput = document.getElementById("location");
  const karnetInput = document.getElementById("oplacony");
  const dateToInput = document.getElementById("data1");
  const numberKarnetInput = document.getElementById("numerKarnetu");

  const reqMessage = document.getElementById('errorMessage-required').innerText;
  const reqMessageSummary = document.getElementById('errorMessage-requiredSummary').innerText;
  const reqMessageDate = document.getElementById('errorMessage-requiredDate').innerText;
  const reqMessageKarnet = document.getElementById('errorMessage-requiredkarnet').innerText;

  const errorClient = document.getElementById("errorClient");
  const errorLocation = document.getElementById("errorLocation");
  const errorKarnet = document.getElementById("errorKarnet");
  const errorDateTo = document.getElementById("errorDateTo");
  const errorNumberKarnet = document.getElementById("errorNumberKarnet");

  const errorsSummary = document.getElementById("errorsSummary");

  resetErrors(
    [clientInput, locationInput,karnetInput,dateToInput,numberKarnetInput],
    [errorClient , errorLocation,errorKarnet,errorDateTo,errorNumberKarnet],
    [errorsSummary]
  );

  let valid = true;

  if (!checkRequired(clientInput.value)) {
    valid = false;
    clientInput.classList.add("error-input");
    errorClient.innerText = reqMessage;
  }

  if (!checkRequired(locationInput.value)) {
    valid = false;
    locationInput.classList.add("error-input");
    errorLocation.innerText = reqMessage;
  }

  let nowDate = new Date(),
  month = "" + (nowDate.getMonth() + 1);
  (day = "" + nowDate.getDate()), 
  (year = nowDate.getFullYear());

if (month.length < 2)
   month = "0" + month;
if (day.length < 2) 
    day = "0" + day;

    const nowString = [year, month, day].join("-");

  if (!checkRequired(dateToInput.value))
    {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqMessage;
    }

    
    else if (checkDateIsAfter(dateToInput.value, nowString))
    {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqMessageDate;
    }


    if (!checkNumberRange(numberKarnetInput.value, 1, 9999)) {
      valid = false;
      numberKarnetInput.classList.add("error-input");
      errorNumberKarnet.innerText = reqMessageKarnet;
    }
  





  
  if (!valid) {
    errorsSummary.innerText = reqMessageSummary;
  }
console.log('+++++++', errorsSummary)
  return valid;
}
