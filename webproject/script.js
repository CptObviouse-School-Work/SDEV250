/************************************************************************************
Global variables
************************************************************************************/
var electricPower = document.getElementById("electricPower");
var numberOfDays = document.getElementById("numberOfDays");
var total = document.getElementById("total");
var slipFeeCalculator = document.getElementById("slipFeeCalculator");
var parkingPassCalculator = document.getElementById("parkingPassCalculator");
var carRentalCalculator = document.getElementById("carRentalCalculator");
var carRentalDays = document.getElementById("carRentalDays");
var errorMessage = document.getElementById('errorMessage');
var slipDailyFee = 25;
var electricFee = 15;
var parkingFee = 5;
var carRentalFee = 75;

/************************************************************************************
Event Listeners
************************************************************************************/
if(electricPower.addEventListener){
    electricPower.addEventListener("change", validateForm);
} else if (electricPower.attachEvent){
  // Use attachEvent for older browser support
  electricPower.attachEvent("change", validateForm);
}
if(numberOfDays.addEventListener){
    numberOfDays.addEventListener("change", validateForm);
} else if (numberOfDays.attachEvent){
  // Use attachEvent for older browser support
  numberOfDays.attachEvent("change", validateForm);
}

/************************************************************************************
 Displays calculaters based on user selection
************************************************************************************/
function togglePage(pageId){
  switch (pageId){
    case 1:
      slipFeeCalculator.classList.toggle("noShow");
      validateForm();
      break;
    case 2:
      parkingPassCalculator.classList.toggle("noShow");
      validateForm();
      break;
    case 3:
      carRentalCalculator.classList.toggle("noShow");
      validateForm();
      break;
    default:
      break;
  }
}

function validateForm(){
  try {
    if(isNaN(numberOfDays.value)) throw "Please enter a number for days";
    if(numberOfDays.value < 1) throw "Please enter a number greater than 0 for days";
    errorMessage.style.display = "none";
    calculateTotal();
  }
  catch(err) {
    errorMessage.innerHTML = err
    errorMessage.style.display = "block";
  }
}
/************************************************************************************
 Calculates the total fee based on the total number of slip days and if power is required
************************************************************************************/
function calculateTotal(){
  // Define local variables
  var calculatedTotal = 0;
  if (!slipFeeCalculator.classList.contains("noShow")){
    // Multiply each day by the cost of power if selected
    if (electricPower.value === "Yes") {
      calculatedTotal += electricFee * numberOfDays.value;
    }
    // Multiply each day by the cost of the daily fee
    calculatedTotal += numberOfDays.value * slipDailyFee;
  }

  if (!parkingPassCalculator.classList.contains("noShow")){
    // Multiply each day by the cost of parking fee
    calculatedTotal += numberOfDays.value * parkingFee;
  }

  if (!carRentalCalculator.classList.contains("noShow")){
    // Multiply each day by the cost of parking fee
    calculatedTotal += numberOfDays.value * carRentalFee;
  }

  // Update the page with the appropriate total
  total.innerHTML = "$" + calculatedTotal;
}


function displayBrowserInformation(){
  var appName = document.getElementById("appName");
  var appVersion = document.getElementById("appVersion");
  var geoLocation = document.getElementById("geoLocation");
  var onLine = document.getElementById("onLine");
  var platform = document.getElementById("platform");
  var userAgent = document.getElementById("userAgent");

  appName.innerHTML = "Web browser name: " + navigator.appName;
  appVersion.innerHTML = "Web browser version: " + navigator.appVersion;
  geoLocation.innerHTML = "Location: " + navigator.geolocation;
  onLine.innerHTML = "Online Status: " + navigator.onLine;
  platform.innerHTML = "Operating platform: " + navigator.platform;
  userAgent.innerHTML = "User agent: " + navigator.userAgent;


}
/************************************************************************************
Function Calls
************************************************************************************/
validateForm();
displayBrowserInformation();
