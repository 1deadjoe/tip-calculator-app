const billInput = document.getElementById("bill");
const customTip = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people");
const perPerson = document.getElementById("per-person");
const total = document.getElementById("total");
const tipSelection = document.querySelectorAll(".tipSelection");
const error = document.querySelector(".error");
const resetButton = document.getElementById("reset");

billInput.addEventListener("input", billInputData);
peopleInput.addEventListener("input", peopleInputData);
customTip.addEventListener("input", customInputData);
resetButton.addEventListener("click", resetForm);

tipSelection.forEach(function (val) {
  val.addEventListener("click", handleClick);
});

billInput.value = 0;
peopleInput.value = 1;
perPerson.innerHTML = "$" + (0.0).toFixed(2);
total.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0;
let peopleValue = 1;
if (peopleValue < 1) {
  document.querySelector(".error").classList.remove("hidden");
}
let customValue = "Custom";
let tipSelectionValue = 0.15;

function billInputData() {
  billValue = parseFloat(billInput.value);
  tipCalculation();
}
function peopleInputData() {
  peopleValue = parseFloat(peopleInput.value);
  if (peopleValue < 1) {
    error.style.display = "flex";
    peopleInput.style.border = "solid 4px red";
  } else {
    error.style.display = "none";
    peopleInput.style.border = "none";
    tipCalculation();
  }
}
function customInputData() {
  tipSelectionValue = parseFloat(customTip.value) / 100; // Set custom tip percentage

  // Remove active class from preset tip buttons
  tipSelection.forEach(function (val) {
    val.classList.remove("active-tip");
  });

  tipCalculation();
}

function handleClick(event) {
  tipSelection.forEach(function (val) {
    val.classList.remove("active-tip");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active-tip");
      tipSelectionValue = parseFloat(val.innerHTML) / 100;
    }
  });
  tipCalculation();
}
function tipCalculation() {
  if (peopleValue >= 1) {
    let tipValue = (billValue * tipSelectionValue) / peopleValue;
    let totalTip = (billValue + tipValue) / peopleValue;

    perPerson.innerHTML = "$" + tipValue.toFixed(2);
    total.innerHTML = "$" + totalTip.toFixed(2);
  }
}

function resetForm() {
  billInput.value = 0;
  peopleInput.value = 1;
  customTip.value = "";

  tipSelectionValue = 0.15; // Reset tip to default 15%
  tipSelection.forEach(function (val) {
    val.classList.remove("active-tip");
  });

  perPerson.innerHTML = "$" + (0.0).toFixed(2);
  total.innerHTML = "$" + (0.0).toFixed(2);

  billValue = 0;
  peopleValue = 1;
  customValue = 0;
}
